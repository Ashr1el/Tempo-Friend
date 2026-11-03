"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Calendar, Clock, MessageSquare, User, LogOut, ChevronRight, Plus, Settings, History } from "lucide-react";
import { formatDate, formatTime, formatDateTime } from "@/lib/utils";
import { BOOKING_STATUS_LABELS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";
import type { Booking, Session } from "@/types/database";

interface DashboardClientProps {
  userId: string;
}

export function DashboardClient({ userId }: DashboardClientProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeSession, setActiveSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const supabase = createClient();

    const bookingsChannel = supabase
      .channel("bookings-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookings",
          filter: `participant_id=eq.${userId}`,
        },
        () => loadData()
      )
      .subscribe();

    const sessionsChannel = supabase
      .channel("sessions-changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "sessions",
        },
        () => loadData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(bookingsChannel);
      supabase.removeChannel(sessionsChannel);
    };
  }, [userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const supabase = createClient();

      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*, slot:availability_slots(*)")
        .eq("participant_id", userId)
        .order("requested_at", { ascending: false });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      const { data: sessionsData, error: sessionsError } = await supabase
        .from("sessions")
        .select("*, booking:bookings(*)")
        .eq("booking.participant_id", userId)
        .in("status", ["scheduled", "active"]);

      if (sessionsError) throw sessionsError;

      const active = sessionsData?.find((s) => s.status === "active") || sessionsData?.[0] || null;
      setActiveSession(active);
    } catch (err) {
      setError("Erro ao carregar dados. Tente recarregar a página.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const upcomingBookings = bookings.filter(
    (b) => ["requested", "accepted"].includes(b.status) && b.slot && new Date(b.slot.starts_at) > new Date()
  );
  const pastBookings = bookings.filter(
    (b) => ["completed", "cancelled_by_participant", "cancelled_by_host", "declined", "expired", "no_show"].includes(b.status)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="animate-pulse text-primary-600 dark:text-primary-400">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/painel" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Tempo Friend
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/agenda" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Ver agenda
            </Link>
            <Link href="/painel" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Meu painel
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="ghost" size="sm">
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </form>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            {error}
            <Button variant="outline" size="sm" className="ml-4" onClick={loadData}>
              Tentar novamente
            </Button>
          </Alert>
        )}

        {/* Active Session */}
        {activeSession && activeSession.status === "active" && (
          <div className="mb-8">
            <Card className="border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <MessageSquare className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <div>
                      <p className="text-sm text-primary-700 dark:text-primary-300 font-medium">Conversa em andamento</p>
                      <p className="font-semibold text-primary-900 dark:text-primary-100">
                        Termina às {formatTime(activeSession.ends_at)}
                      </p>
                    </div>
                  </div>
                  <Link href={`/sessao/${activeSession.id}`}>
                    <Button size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Entrar na conversa
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Upcoming Sessions */}
        {(upcomingBookings.length > 0 || (activeSession && activeSession.status === "scheduled")) && (
          <section className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Próximas conversas</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">Suas conversas agendadas e confirmadas</p>
              </div>
              <Link href="/agenda">
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Agendar nova
                </Button>
              </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {activeSession && activeSession.status === "scheduled" && (
                <SessionCard session={activeSession} booking={activeSession.booking as Booking} isActive={false} />
              )}
              {upcomingBookings.map((booking) => (
                <SessionCard key={booking.id} session={null} booking={booking} isActive={false} />
              ))}
            </div>
          </section>
        )}

        {/* History */}
        {pastBookings.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Histórico</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  Conversas passadas (disponíveis por 30 dias após o encerramento)
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {pastBookings.slice(0, 6).map((booking) => (
                <SessionCard key={booking.id} session={null} booking={booking} isActive={false} />
              ))}
            </div>

            {pastBookings.length > 6 && (
              <div className="mt-4 text-center">
                <Link href="/painel/historico">
                  <Button variant="outline">
                    <History className="w-4 h-4 mr-2" />
                    Ver todo o histórico ({pastBookings.length})
                  </Button>
                </Link>
              </div>
            )}
          </section>
        )}

        {/* Empty State */}
        {bookings.length === 0 && !activeSession && (
          <Card className="text-center py-16">
            <CardContent>
              <div className="mx-auto w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nenhuma conversa ainda</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs mx-auto">
                Agende sua primeira conversa gratuita de 15 minutos com o anfitrião.
              </p>
              <Link href="/agenda">
                <Button size="lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Ver horários disponíveis
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

interface SessionCardProps {
  session: Session | null;
  booking: Booking;
  isActive: boolean;
}

function SessionCard({ session, booking, isActive }: SessionCardProps) {
  const slot = booking.slot;
  const statusLabel = BOOKING_STATUS_LABELS[booking.status] || booking.status;
  const isUpcoming = slot && new Date(slot.starts_at) > new Date();
  const canJoin = session?.status === "active" || (session?.status === "scheduled" && isUpcoming);

  return (
    <Card className={`h-full ${isActive ? "border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/20" : ""}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            {slot && (
              <>
                <p className="font-medium text-gray-900 dark:text-white truncate">
                  {formatDate(slot.starts_at, { weekday: "long", day: "numeric", month: "long" })}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {formatTime(slot.starts_at)} - {formatTime(slot.ends_at)}
                </p>
              </>
            )}
          </div>
          <Badge variant={getStatusVariant(booking.status)}>{statusLabel}</Badge>
        </div>

        {canJoin && session && (
          <Link href={`/sessao/${session.id}`} className="block">
            <Button className="w-full" size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              {session.status === "active" ? "Entrar na conversa" : "Aguardando início"}
            </Button>
          </Link>
        )}

        {!canJoin && slot && isUpcoming && (
          <Button variant="outline" className="w-full" size="sm" disabled>
            <Clock className="w-4 h-4 mr-2" />
            Aguardando horário
          </Button>
        )}

        {!isUpcoming && (
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 py-2">
            {booking.status === "completed" && "Conversa finalizada"}
            {booking.status === "cancelled_by_participant" && "Cancelada por você"}
            {booking.status === "cancelled_by_host" && "Cancelada pelo anfitrião"}
            {booking.status === "declined" && "Recusada pelo anfitrião"}
            {booking.status === "expired" && "Solicitação expirada"}
            {booking.status === "no_show" && "Não compareceu"}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info" {
  switch (status) {
    case "accepted":
      return "success";
    case "requested":
      return "warning";
    case "declined":
    case "cancelled_by_host":
    case "cancelled_by_participant":
      return "destructive";
    case "completed":
      return "default";
    case "expired":
    case "no_show":
      return "secondary";
    default:
      return "outline";
  }
}