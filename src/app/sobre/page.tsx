import { Metadata } from "next";
import Link from "next/link";
import { Alert } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Shield, Clock, MessageSquare, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre o Tempo Friend",
  description: "Conheça o Tempo Friend - Plataforma de conversas de companhia gratuitas",
};

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
          <div className="mx-auto w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
            <MessageSquare className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Sobre o Tempo Friend</h1>
          <p className="text-gray-600 dark:text-gray-400">Conversas de companhia, simples e gratuitas.</p>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary-600" />
              Nossa proposta
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>O Tempo Friend nasceu da ideia de que às vezes tudo o que a gente precisa é de alguém para conversar — sem julgamento, sem compromisso, sem custo.</p>
            <p>Não é terapia. Não é coaching. Não é aconselhamento. É apenas uma conversa informal de 15 minutos com alguém que está lá para te ouvir.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gratuito:</strong> Sem taxas, sem assinatura, sem pegadinhas.</li>
              <li><strong>Simples:</strong> Cadastro rápido, agenda visual, chat direto.</li>
              <li><strong>Respeitoso:</strong> Sua privacidade vem primeiro. Histórico por 30 dias, exclusão quando você quiser.</li>
              <li><strong>Seguro:</strong> Regras claras, denúncia fácil, anfitrião treinado.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary-600" />
              Como funciona na prática
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ol className="list-decimal pl-6 space-y-3">
              <li><strong>Crie sua conta</strong> — e-mail, nome de exibição, confirme que tem 18+.</li>
              <li><strong>Veja a agenda</strong> — Horários livres publicados pelo anfitrião.</li>
              <li><strong>Solicite um horário</strong> — Antecedência mínima de 12 horas.</li>
              <li><strong>Aguarde a confirmação</strong> — O anfitrião aceita ou recusa (você recebe e-mail).</li>
              <li><strong>Converse por 15 min</strong> — Chat de texto, temporizador no servidor.</li>
              <li><strong>Quer mais?</strong> — Aos 14 min, pode pedir +15 min (se o anfitrião aceitar e não houver conflito).</li>
              <li><strong>Encerre quando quiser</strong> — Qualquer lado pode sair a qualquer momento.</li>
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              O que NÃO somos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20">
              <strong>Não somos serviço de saúde, emergência ou terapia.</strong>
              Não fazemos diagnóstico, tratamento, aconselhamento psicológico ou psiquiátrico.
              Em crise, procure SAMU (192), Polícia (190) ou CVV (188).
            </Alert>
            <ul className="list-disc pl-6 space-y-2 text-red-700 dark:text-red-300">
              <li>Não substituímos acompanhamento profissional.</li>
              <li>Não garantimos disponibilidade contínua ou vínculo futuro.</li>
              <li>Não oferecemos planos, pacotes ou fidelidade.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Quem está do outro lado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>No MVP, há <strong>um único anfitrião</strong> — a pessoa que criou e opera a plataforma.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>O anfitrião não é psicólogo, terapeuta ou profissional de saúde.</li>
              <li>O anfitrião passa por verificação de identidade e treinamento em acolhimento, limites e segurança.</li>
              <li>O anfitrião pode aceitar ou recusar qualquer solicitação, sem justificativa obrigatória.</li>
              <li>O anfitrião <strong>não lê o histórico</strong> das conversas dos participantes (exceto mensagens anexadas em denúncias).</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary-600" />
              Contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Dúvidas, sugestões, solicitações LGPD, denúncias ou imprensa:</p>
            <a href="mailto:contato@tempo-friend.com" className="text-primary-600 hover:underline dark:text-primary-400 font-medium">
              contato@tempo-friend.com
            </a>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tempo de resposta: até 2 dias úteis. Não é canal de emergência.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documentos legais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link href="/termos" className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <p className="font-medium">Termos de Uso</p>
              <p className="text-sm text-gray-500">Regras do serviço, responsabilidades, limites</p>
            </Link>
            <Link href="/privacidade" className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <p className="font-medium">Política de Privacidade</p>
              <p className="text-sm text-gray-500">Quais dados coletamos, como usamos, seus direitos</p>
            </Link>
            <Link href="/regras" className="block p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <p className="font-medium">Regras da Comunidade</p>
              <p className="text-sm text-gray-500">Conduta esperada, denúncias, consequências</p>
            </Link>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400 space-y-1">
          <p>© {new Date().getFullYear()} Tempo Friend. Todos os direitos reservados.</p>
          <p>Operado por pessoa física no Brasil. Marca pública: Tempo Friend.</p>
          <p className="text-xs">Não é serviço de saúde. Em emergência: SAMU 192 / Polícia 190 / CVV 188.</p>
        </footer>
      </div>
    </div>
  );
}