"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Calendar, Clock, Loader2, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { formatDate, formatTime, addMinutes, minutesUntil } from "@/lib/utils";
import type { AvailabilitySlot, Booking } from "@/types/database";

interface AgendaClientProps {
  userId: string;
}

export function AgendaClient({ userId }: AgendaClientProps) {
  const [currentWeek, setCurrentWeek] = useState<Date>(new Date());
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingSlotId, setBookingSlotId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, [currentWeek, userId]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const supabase = createClient();

      const weekStart = new Date(currentWeek);
      weekStart.setDate(weekStart.getDate() - weekStart.getDay());
      weekStart.setHours(0, 0, 0, 0);

      const weekEnd = new Date(weekStart);
      weekEnd.setDate(weekEnd.getDate() + 6);
      weekEnd.setHours(23, 59, 59, 999);

      const { data: slotsData, error: slotsError } = await supabase
        .from("availability_slots")
        .select("*")
        .eq("status", "open")
        .gte("starts_at", weekStart.toISOString())
        .lte("starts_at", weekEnd.toISOString())
        .order("starts_at", { ascending: true });

      if (slotsError) throw slotsError;

      const { data: bookingsData, error: bookingsError } = await supabase
        .from("bookings")
        .select("*")
        .eq("participant_id", userId)
        .in("status", ["requested", "accepted"]);

      if (bookingsError) throw bookingsError;

      setSlots(slotsData || []);
      setBookings(bookingsData || []);
    } catch (err) {
      setError("Erro ao carregar agenda. Tente recarregar.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousWeek = () => {
    setCurrentWeek((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 7);
      return d;
    });
  };

  const handleNextWeek = () => {
    setCurrentWeek((prev) => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 7);
      return d;
    });
  };

  const handleBookSlot = async (slotId: string) => {
    if (bookingSlotId) return;

    setBookingSlotId(slotId);
    try {
      const supabase = createClient();

      const { error } = await supabase.rpc("request_booking", {
        p_slot_id: slotId,
        p_participant_id: userId,
      });

      if (error) {
        throw new Error(error.message);
      }

      loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao solicitar horário");
    } finally {
      setBookingSlotId(null);
    }
  };

  const groupedSlots = slots.reduce((acc, slot) => {
    const dateKey = formatDate(slot.starts_at, { weekday: "long", day: "numeric", month: "long" });
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(slot);
    return acc;
  }, {} as Record<string, AvailabilitySlot[]>);

  const sortedDays = Object.keys(groupedSlots).sort((a, b) => {
    const dateA = slots.find((s) => formatDate(s.starts_at, { weekday: "long", day: "numeric", month: "long" }) === a)?.starts_at;
    const dateB = slots.find((s) => formatDate(s.starts_at, { weekday: "long", day: "numeric", month: "long" }) === b)?.starts_at;
    return (dateA ? new Date(dateA).getTime() : 0) - (dateB ? new Date(dateB).getTime() : 0);
  });

  const getSlotStatus = (slot: AvailabilitySlot) => {
    const userBooking = bookings.find((b) => b.slot_id === slot.id);
    const now = new Date();
    const slotStart = new Date(slot.starts_at);
    const minutesUntilStart = minutesUntil(slot.starts_at);

    if (userBooking) {
      return { status: "mine" as const, label: userBooking.status === "accepted" ? "Confirmado" : "Solicitado", variant: "success" as const };
    }

    if (slotStart < now) {
      return { status: "past" as const, label: "Passado", variant: "secondary" as const };
    }

    if (minutesUntilStart < 12 * 60) {
      return { status: "too-soon" as const, label: "Menos de 12h", variant: "destructive" as const };
    }

    return { status: "available" as const, label: "Disponível", variant: "default" as const };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/painel" className="text-xl font-bold text-primary-600 dark:text-primary-400">
            Tempo Friend
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/painel" className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
              Meu painel
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="ghost" size="sm">
                Sair
              </Button>
            </form>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Agenda de horários</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Escolha um horário livre. A antecedência mínima é de 12 horas.
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            {error}
          </Alert>
        )}

        {/* Week Navigation */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="outline" size="sm" onClick={handlePreviousWeek} disabled={loading}>
            <ChevronLeft className="w-4 h-4 mr-1" />
            Semana anterior
          </Button>
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              {formatDate(currentWeek, { month: "long", year: "numeric" })}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Semana de {formatDate(new Date(currentWeek.setDate(currentWeek.getDate() - currentWeek.getDay())))}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={handleNextWeek} disabled={loading}>
            Próxima semana
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-12 bg-gray-200 dark:bg-gray-700 rounded" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : sortedDays.length === 0 ? (
          <Card className="text-center py-16">
            <CardContent>
              <Calendar className="mx-auto w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Nenhum horário disponível esta semana</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                O anfitrião ainda não cadastrou horários para este período.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {sortedDays.map((day) => (
              <Card key={day}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{day}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {groupedSlots[day].map((slot) => {
                      const status = getSlotStatus(slot);
                      const isBookedByOther = !bookings.find((b) => b.slot_id === slot.id) && slot.status !== "open";

                      return (
                        <Button
                          key={slot.id}
                          variant={status.variant}
                          className="h-auto p-4 text-left justify-start gap-3"
                          onClick={() => handleBookSlot(slot.id)}
                          disabled={status.status !== "available" || bookingSlotId === slot.id || loading}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm">{formatTime(slot.starts_at)} - {formatTime(slot.ends_at)}</p>
                            <Badge variant={status.variant} className="mt-1">{status.label}</Badge>
                          </div>
                          {bookingSlotId === slot.id && <Loader2 className="w-4 h-4 animate-spin" />}
                        </Button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Info Box */}
        <Card className="mt-8 border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                <p><strong>Como funciona:</strong> Ao clicar em um horário "Disponível", sua solicitação é enviada ao anfitrião.</p>
                <p>O anfitrião pode <strong>aceitar ou recusar</strong>. Você receberá um e-mail com a resposta.</p>
                <p>Se aceito, a conversa fica <strong>confirmada</strong> e você receberá lembrete antes do horário.</p>
                <p>Você pode <strong>cancelar a qualquer momento</strong> no seu painel.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}