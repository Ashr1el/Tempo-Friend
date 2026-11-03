"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gray-50 dark:bg-gray-950">
      <Card className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-center">
        <CardHeader>
          <div className="mx-auto w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
            <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-2xl">Verifique seu e-mail</CardTitle>
          <CardDescription>
            Enviamos um link de confirmação para o seu endereço de e-mail.
            Clique no link para ativar sua conta.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg text-left">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Não recebeu o e-mail?</p>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 pl-4 list-disc">
              <li>Verifique a pasta de spam/lixo eletrônico</li>
              <li>Confirme se digitou o e-mail corretamente</li>
              <li>Aguarde alguns minutos — às vezes demora um pouco</li>
            </ul>
          </div>
          <Button variant="outline" className="w-full" onClick={() => window.location.reload()}>
            <Loader2 className="w-4 h-4 mr-2" />
            Reenviar e-mail
          </Button>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            O link expira em 24 horas. Se expirar, você pode solicitar um novo acima.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}