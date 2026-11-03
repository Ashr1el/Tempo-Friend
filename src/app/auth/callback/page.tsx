import { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Confirmando...",
};

export default async function AuthCallbackPage({ searchParams }: { searchParams: Promise<{ code?: string; next?: string }> }) {
  const { code, next } = await searchParams;

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  redirect(next || "/painel");
}