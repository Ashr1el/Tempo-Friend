"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  displayName: z.string().min(1).max(60, "Nome de exibição deve ter 1-60 caracteres"),
  adultConfirmed: z.boolean().refine((val) => val === true, { message: "Você deve confirmar que tem 18 anos ou mais" }),
  termsAccepted: z.boolean().refine((val) => val === true, { message: "Você deve aceitar os Termos de Uso" }),
  privacyAccepted: z.boolean().refine((val) => val === true, { message: "Você deve confirmar ciência da Política de Privacidade" }),
});

export async function signup(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
    displayName: formData.get("displayName"),
    adultConfirmed: formData.get("adultConfirmed") === "on",
    termsAccepted: formData.get("termsAccepted") === "on",
    privacyAccepted: formData.get("privacyAccepted") === "on",
  };

  const parsed = signupSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { email, password, displayName } = parsed.data;

  // Sign up with Supabase Auth - Supabase envia email de confirmação automaticamente
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });

  if (authError) {
    return { error: { _form: [authError.message] } };
  }

  if (authData.user) {
    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      user_id: authData.user.id,
      display_name: displayName,
      adult_confirmed_at: new Date().toISOString(),
      status: "active",
    });

    if (profileError) {
      console.error("Profile creation error:", profileError);
    }

    // Record consent
    const now = new Date().toISOString();
    await supabase.from("consent_records").insert([
      { user_id: authData.user.id, document_type: "terms", document_version: "1.0", accepted_at: now },
      { user_id: authData.user.id, document_type: "privacy", document_version: "1.0", accepted_at: now },
      { user_id: authData.user.id, document_type: "community_rules", document_version: "1.0", accepted_at: now },
    ]);
  }

  redirect("/auth/verifique-seu-email");
}

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "Senha é obrigatória"),
});

export async function login(formData: FormData) {
  const supabase = await createClient();

  const rawData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(rawData);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: { _form: [error.message] } };
  }

  redirect("/painel");
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function requestPasswordReset(formData: FormData) {
  const supabase = await createClient();
  const email = formData.get("email") as string;

  if (!email || !email.includes("@")) {
    return { error: { email: ["E-mail inválido"] } };
  }

  // Supabase envia email de reset automaticamente
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/nova-senha`,
  });

  if (error) {
    return { error: { _form: [error.message] } };
  }

  return { success: true };
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (password !== confirmPassword) {
    return { error: { confirmPassword: ["As senhas não coincidem"] } };
  }

  if (password.length < 8) {
    return { error: { password: ["A senha deve ter pelo menos 8 caracteres"] } };
  }

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: { _form: [error.message] } };
  }

  redirect("/painel?password_updated=1");
}