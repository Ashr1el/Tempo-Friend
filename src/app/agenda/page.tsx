import { getSession } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { AgendaClient } from "./agenda-client";

export default async function AgendaPage() {
  const user = await getSession();
  if (!user) {
    redirect("/auth/login");
  }

  return <AgendaClient userId={user.id} />;
}