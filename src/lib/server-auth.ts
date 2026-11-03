import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function getSession() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.from("profiles").select("*").eq("user_id", userId).single();
  if (error) return null;
  return data;
}

export async function requireAuth() {
  const user = await getSession();
  if (!user) {
    redirect("/auth/login");
  }
  return user;
}

export async function requireHost() {
  const user = await requireAuth();
  const hostUserId = process.env.NEXT_PUBLIC_HOST_USER_ID;
  if (user.id !== hostUserId) {
    redirect("/");
  }
  return user;
}