import { getSession } from "@/lib/server-auth";
import { redirect, notFound } from "next/navigation";
import { SessionClient } from "./session-client";

interface SessionPageProps {
  params: Promise<{ id: string }>;
}

export default async function SessionPage({ params }: SessionPageProps) {
  const { id } = await params;
  const user = await getSession();

  if (!user) {
    redirect(`/auth/login?redirect=/sessao/${id}`);
  }

  return <SessionClient sessionId={id} userId={user.id} />;
}