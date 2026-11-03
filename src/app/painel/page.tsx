import { getSession } from "@/lib/server-auth";
import { redirect } from "next/navigation";
import { DashboardClient } from "./dashboard-client";

export default async function DashboardPage() {
  const user = await getSession();
  if (!user) {
    redirect("/auth/login");
  }

  return <DashboardClient userId={user.id} />;
}