import { login } from "@/lib/actions/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await login(formData);
  return NextResponse.json(result);
}