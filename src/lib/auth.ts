import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const supabase = createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).single();
  if (error) return null;
  return data;
}

export async function isHost(userId: string): Promise<boolean> {
  // No MVP, há um único anfitrião. Verificar por configuração ou role.
  // Por enquanto, verificar se o usuário tem uma flag ou é o host configurado.
  const hostUserId = process.env.NEXT_PUBLIC_HOST_USER_ID;
  return userId === hostUserId;
}

export function requireAuth() {
  // Helper para Server Components que precisam de autenticação
  // O uso real será em server actions ou middleware
}