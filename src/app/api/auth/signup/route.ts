import { signup } from "@/lib/actions/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();
  const result = await signup(formData);
  return NextResponse.json(result);
}