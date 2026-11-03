"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { createClient } from "@/lib/supabase/client";
import { formatDate, formatTime, minutesUntil, cn } from "@/lib/utils";
import { MessageSquare, Send, Clock, X, AlertCircle, Loader2, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import type { Session, Message, Profile } from "@/types/database";

interface SessionClientProps {
  sessionId: string;
  userId: string;
}

export function SessionClient({ sessionId, userId }: SessionClientProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [extensionRequested, setExtensionRequested] = useState(false);
  const [extensionLoading, setExtensionLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioEnabled = useRef(false);
  const sttEnabled = useRef(false);

  useEffect(() => {
    loadSession();
    const supabase = createClient();

    // Subscribe to messages
    const messagesChannel = supabase
      .channel(`session-${sessionId}-messages`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    // Subscribe to session changes
    const sessionChannel = supabase
      .channel(`session-${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "sessions",
          filter: `id=eq.${sessionId}`,
        },
        (payload) => {
          setSession(payload.new as Session);
        }
      )
      .subscribe();

    // Timer
    const timer = setInterval(() => {
      if (session?.ends_at) {
        const remaining = minutesUntil(session.ends_at);
        setTimeRemaining(remaining);
        if (remaining <= 0) {
          setSession((s) => s ? { ...s, status: "ended" } : null);
        }
      }
    }, 1000);

    return () => {
      supabase.removeChannel(messagesChannel);
      supabase.removeChannel(sessionChannel);
      clearInterval(timer);
    };
  }, [sessionId]);

  const loadSession = async () => {
    try {
      const supabase = createClient();

      const { data: sessionData, error: sessionError } = await supabase
        .from("sessions")
        .select("*, booking:bookings(*, participant:profiles!bookings_participant_id_fkey(*), slot:availability_slots(*))")
        .eq("id", sessionId)
        .single();

      if (sessionError) throw sessionError;
      if (!sessionData) throw new Error("Sessão não encontrada");

      // Check if user is participant or host
      const isParticipant = sessionData.booking?.participant_id === userId;
      const isHost = process.env.NEXT_PUBLIC_HOST_USER_ID === userId;

      if (!isParticipant && !isHost) {
        setError("Você não tem permissão para acessar esta sessão");
        return;
      }

      setSession(sessionData);

      const { data: messagesData, error: messagesError } = await supabase
        .from("messages")
        .select("*, sender:profiles(*)")
        .eq("session_id", sessionId)
        .order("created_at", { ascending: true });

      if (messagesError) throw messagesError;
      setMessages(messagesData || []);

      if (sessionData.ends_at) {
        setTimeRemaining(minutesUntil(sessionData.ends_at));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao carregar sessão");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("messages").insert({
        session_id: sessionId,
        sender_id: userId,
        body: newMessage.trim(),
      });

      if (error) throw error;
      setNewMessage("");
    } catch (err) {
      setError("Erro ao enviar mensagem");
      console.error(err);
    } finally {
      setSending(false);
    }
  };

  const handleEndSession = async () => {
    if (!confirm("Tem certeza que deseja encerrar a conversa?")) return;

    try {
      const supabase = createClient();
      const { error } = await supabase.rpc("end_session", {
        p_session_id: sessionId,
        p_ended_by: userId,
      });

      if (error) throw error;
      setSession((s) => s ? { ...s, status: "ended", ended_at: new Date().toISOString(), ended_by: userId } : null);
    } catch (err) {
      setError("Erro ao encerrar sessão");
      console.error(err);
    }
  };

  const handleRequestExtension = async () => {
    if (!session) return;
    setExtensionLoading(true);
    try {
      const supabase = createClient();
      const { error } = await supabase.from("extension_requests").insert({
        session_id: sessionId,
        requested_at: new Date().toISOString(),
        decision: "pending",
      });

      if (error) throw error;
      setExtensionRequested(true);
    } catch (err) {
      setError("Erro ao solicitar extensão");
      console.error(err);
    } finally {
      setExtensionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="w-4 h-4 mr-2" />
          {error}
        </Alert>
      </div>
    );
  }

  if (!session) return null;

  const isActive = session.status === "active";
  const isScheduled = session.status === "scheduled";
  const isEnded = ["ended", "expired", "cancelled"].includes(session.status);
  const canRequestExtension = isActive && !extensionRequested && timeRemaining !== null && timeRemaining <= 1 && timeRemaining > 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Header */}
      <header className={cn(
        "bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 sticky top-0 z-40",
        isActive ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800" : "",
        isEnded ? "bg-gray-100 dark:bg-gray-800" : ""
      )}>
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Button variant="ghost" size="icon" onClick={() => window.history.back()}>
              <X className="w-5 h-5" />
            </Button>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white truncate">
                {session.booking?.slot ? formatDate(session.booking.slot.starts_at) : "Conversa"}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                {session.booking?.participant?.display_name || "Participante"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isActive && (
              <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-sm font-medium">AO VIVO</span>
              </div>
            )}
            {isScheduled && (
              <Badge variant="warning">Agendada</Badge>
            )}
            {isEnded && (
              <Badge variant="secondary">Encerrada</Badge>
            )}

            {/* Timer */}
            {timeRemaining !== null && !isEnded && (
              <div className={cn(
                "flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-mono font-medium",
                timeRemaining <= 2 ? "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 animate-pulse" : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              )}>
                <Clock className="w-4 h-4" />
                {timeRemaining > 0 ? `${timeRemaining} min` : "Encerrando..."}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pb-4" role="log" aria-live="polite">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
              <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
              <p className="text-center">Nenhuma mensagem ainda</p>
              {isActive && <p className="text-sm">Comece a conversa!</p>}
              {isScheduled && <p className="text-sm">A conversa começa às {session.booking?.slot ? formatTime(session.booking.slot.starts_at) : ""}</p>}
              {isEnded && <p className="text-sm">Esta conversa foi encerrada.</p>}
            </div>
          ) : (
            messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} isOwn={msg.sender_id === userId} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        {isActive && (
          <form onSubmit={handleSendMessage} className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                className="flex-1 px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={sending}
                maxLength={8000}
              />
              <Button type="submit" size="lg" disabled={!newMessage.trim() || sending} loading={sending}>
                <Send className="w-5 h-5" />
              </Button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 text-right">
              Máximo 8.000 caracteres
            </p>
          </form>
        )}

        {isScheduled && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4 text-center text-gray-600 dark:text-gray-400">
            <p>A conversa começará automaticamente no horário agendado.</p>
            <p className="text-sm mt-1">
              Horário: {session.booking?.slot ? `${formatTime(session.booking.slot.starts_at)} - ${formatTime(session.booking.slot.ends_at)}` : ""}
            </p>
          </div>
        )}

        {isEnded && (
          <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
            <Alert className="mb-4">
              <AlertCircle className="w-4 h-4 mr-2" />
              Esta conversa foi encerrada. O histórico ficará disponível por 30 dias.
            </Alert>
            <Button variant="outline" onClick={() => window.location.href = "/painel"}>
              Voltar ao painel
            </Button>
          </div>
        )}

        {/* Extension Button */}
        {canRequestExtension && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-100">Quer mais tempo?</p>
                <p className="text-sm text-amber-700 dark:text-amber-300">
                  Faltam menos de 2 minutos. Você pode solicitar mais 15 minutos (sujeito à aprovação do anfitrião).
                </p>
              </div>
              <Button onClick={handleRequestExtension} loading={extensionLoading}>
                <Clock className="w-4 h-4 mr-2" />
                Solicitar +15 min
              </Button>
            </div>
          </div>
        )}

        {extensionRequested && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-blue-900 dark:text-blue-100">
              Solicitação enviada! Aguardando resposta do anfitrião.
            </p>
          </div>
        )}
      </main>

      {/* Footer Controls */}
      {isActive && (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => { audioEnabled.current = !audioEnabled.current; }}>
                {audioEnabled.current ? <Mic className="w-5 h-5 text-primary-600" /> : <MicOff className="w-5 h-5" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => { sttEnabled.current = !sttEnabled.current; }}>
                <Volume2 className="w-5 h-5" />
              </Button>
            </div>
            <Button variant="destructive" onClick={handleEndSession}>
              <X className="w-4 h-4 mr-2" />
              Encerrar conversa
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
}

function MessageBubble({ message, isOwn }: { message: Message; isOwn: boolean }) {
  return (
    <div className={cn("flex gap-2", isOwn ? "justify-end" : "justify-start")}>
      {!isOwn && (
        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
            {message.sender?.display_name?.charAt(0).toUpperCase() || "?"}
          </span>
        </div>
      )}
      <div className={cn("max-w-[70%] rounded-2xl px-4 py-2", isOwn ? "bg-primary-600 text-white rounded-tr-sm" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tl-sm")}>
        {!isOwn && message.sender?.display_name && (
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">{message.sender.display_name}</p>
        )}
        <p className="whitespace-pre-wrap break-words">{message.body}</p>
        <p className={cn("text-xs mt-1 text-right opacity-70", isOwn ? "text-primary-100" : "text-gray-400 dark:text-gray-500")}>
          {formatTime(message.created_at)}
        </p>
      </div>
      {isOwn && (
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-medium text-primary-600 dark:text-primary-400">Você</span>
        </div>
      )}
    </div>
  );
}