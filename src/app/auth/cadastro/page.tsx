"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Loader2, Mail, Lock, User, Shield, Eye, EyeOff, CheckCircle } from "lucide-react";

const signupSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
  confirmPassword: z.string(),
  displayName: z.string().min(1, "Nome de exibição é obrigatório").max(60, "Máximo 60 caracteres"),
  adultConfirmed: z.boolean().refine((val) => val === true, { message: "Você deve confirmar que tem 18 anos ou mais" }),
  termsAccepted: z.boolean().refine((val) => val === true, { message: "Você deve aceitar os Termos de Uso" }),
  privacyAccepted: z.boolean().refine((val) => val === true, { message: "Você deve confirmar ciência da Política de Privacidade" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

type SignupForm = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      adultConfirmed: false,
      termsAccepted: false,
      privacyAccepted: false,
    },
  });

  const password = watch("password") ?? "";

  const passwordRequirements = [
    { label: "Mínimo 8 caracteres", met: password.length >= 8 },
    { label: "Uma letra maiúscula", met: /[A-Z]/.test(password) },
    { label: "Uma letra minúscula", met: /[a-z]/.test(password) },
    { label: "Um número", met: /[0-9]/.test(password) },
  ];

  const onSubmit = async (data: SignupForm) => {
    setIsLoading(true);
    setServerError(null);

    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("displayName", data.displayName);
    formData.append("adultConfirmed", "on");
    formData.append("termsAccepted", "on");
    formData.append("privacyAccepted", "on");

    const response = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();

    if (result.error) {
      const fieldErrors = result.error;
      if (fieldErrors._form) {
        setServerError(fieldErrors._form[0]);
      }
      setIsLoading(false);
    } else {
      window.location.href = "/auth/verifique-seu-email";
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
            <User className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <CardTitle className="text-2xl">Criar conta</CardTitle>
          <CardDescription>Grátis, seguro e apenas para maiores de 18 anos</CardDescription>
        </CardHeader>
        <CardContent>
          {serverError && (
            <Alert variant="destructive" className="mb-4">
              {serverError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="displayName">Nome de exibição</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="displayName"
                  placeholder="Como você quer ser chamado(a)"
                  className="pl-10"
                  {...register("displayName")}
                  disabled={isLoading}
                />
              </div>
              {errors.displayName && <p className="text-sm text-red-600 dark:text-red-400">{errors.displayName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  className="pl-10"
                  {...register("email")}
                  disabled={isLoading}
                />
              </div>
              {errors.email && <p className="text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10 pr-10"
                  {...register("password")}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req) => (
                    <div key={req.label} className="flex items-center gap-2 text-xs">
                      <CheckCircle className={`w-3.5 h-3.5 ${req.met ? "text-green-500" : "text-gray-300 dark:text-gray-600"}`} />
                      <span className={`${req.met ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}`}>
                        {req.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              {errors.password && <p className="text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="pl-10"
                  {...register("confirmPassword")}
                  disabled={isLoading}
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600 dark:text-red-400">{errors.confirmPassword.message}</p>}
            </div>

            <div className="space-y-3 pt-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="adultConfirmed"
                  {...register("adultConfirmed")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="adultConfirmed" className="text-sm text-gray-700 dark:text-gray-300">
                  Confirmo que tenho <strong>18 anos ou mais</strong>
                </label>
              </div>
              {errors.adultConfirmed && <p className="text-sm text-red-600 dark:text-red-400 ml-7">{errors.adultConfirmed.message}</p>}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="termsAccepted"
                  {...register("termsAccepted")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="termsAccepted" className="text-sm text-gray-700 dark:text-gray-300">
                  Li e aceito os <Link href="/termos" className="text-primary-600 hover:underline dark:text-primary-400">Termos de Uso</Link>
                </label>
              </div>
              {errors.termsAccepted && <p className="text-sm text-red-600 dark:text-red-400 ml-7">{errors.termsAccepted.message}</p>}
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  {...register("privacyAccepted")}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  required
                  disabled={isLoading}
                />
                <label htmlFor="privacyAccepted" className="text-sm text-gray-700 dark:text-gray-300">
                  Confirmo ciência da <Link href="/privacidade" className="text-primary-600 hover:underline dark:text-primary-400">Política de Privacidade</Link>
                </label>
              </div>
              {errors.privacyAccepted && <p className="text-sm text-red-600 dark:text-red-400 ml-7">{errors.privacyAccepted.message}</p>}
            </div>

            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
              <Loader2 className="w-4 h-4" />
              Criar conta
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <p className="text-center text-sm text-gray-600 dark:text-gray-400">
            Já tem conta?{" "}
            <Link href="/auth/login" className="text-primary-600 hover:underline dark:text-primary-400 font-medium">
              Entrar
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}