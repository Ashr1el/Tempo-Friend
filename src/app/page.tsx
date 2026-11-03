import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_NAME } from "@/lib/constants";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative px-4 py-20 sm:py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 mb-6 text-sm font-medium">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            MVP em desenvolvimento
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
            Conversas de companhia,<br />
            <span className="text-primary-600 dark:text-primary-400">gratuitas e agendadas</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
            Agende uma conversa informal de 15 minutos com o anfitrião.
            Sem compromisso, sem custo, sem vídeo — apenas uma conversa leve quando você quiser.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/cadastro">
              <Button size="xl" className="w-full sm:w-auto">
                Quero conversar
              </Button>
            </Link>
            <Link href="/sobre">
              <Button variant="outline" size="xl" className="w-full sm:w-auto">
                Como funciona
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Simples por design
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Tudo pensado para ser direto, seguro e respeitoso com seu tempo.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="h-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {feature.details.map((detail) => (
                      <li key={detail} className="flex items-start gap-2">
                        <span className="text-primary-500 shrink-0 mt-0.5">•</span>
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-16 sm:py-24 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Como funciona
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Quatro passos simples para sua conversa.
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="absolute left-1/2 top-0 -translate-x-1/2 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center text-xl font-bold z-10">
                  {index + 1}
                </div>
                <div className="pt-14 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-4 left-[calc(50%+5px)] right-0 h-0.5 bg-gray-200 dark:bg-gray-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important notices */}
      <section className="px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto space-y-6">
          <Card className="border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-1">Não é serviço de saúde</h3>
                  <p className="text-sm text-amber-800 dark:text-amber-200">
                    Esta plataforma oferece conversas informais de companhia. Não realiza diagnóstico, tratamento,
                    terapia, aconselhamento psicológico ou psiquiátrico. Em emergência, procure SAMU (192) ou Polícia (190).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Maiores de 18 anos</h3>
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    O cadastro exige confirmação de maioridade. A plataforma é exclusivamente para adultos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">Gratuito e sem obrigação</h3>
                  <p className="text-sm text-green-800 dark:text-green-200">
                    Agendamento e conversa são gratuitos. O anfitrião pode aceitar ou recusar. Qualquer lado pode
                    encerrar a qualquer momento. Doações são opcionais e não compram benefícios.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:py-24 bg-gray-900 dark:bg-gray-950">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pronto para conversar?
          </h2>
          <p className="text-gray-300 mb-8">
            Crie sua conta gratuita e veja os horários disponíveis.
          </p>
          <Link href="/auth/cadastro">
            <Button size="xl" className="w-full sm:w-auto bg-primary-600 hover:bg-primary-700">
              Começar agora
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 py-12 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{APP_NAME}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
                Conversas informais de companhia, gratuitas e agendadas. Simples, respeitoso e sem compromisso.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/termos" className="hover:text-primary-600 dark:hover:text-primary-400">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-primary-600 dark:hover:text-primary-400">Política de Privacidade</Link></li>
                <li><Link href="/regras" className="hover:text-primary-600 dark:hover:text-primary-400">Regras da Comunidade</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">Contato</h4>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><a href="mailto:contato@tempo-friend.com" className="hover:text-primary-600 dark:hover:text-primary-400">contato@tempo-friend.com</a></li>
                <li><Link href="/sobre" className="hover:text-primary-600 dark:hover:text-primary-400">Sobre</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-gray-500 dark:text-gray-400">
            <p>© {new Date().getFullYear()} {APP_NAME}. Todos os direitos reservados.</p>
            <p className="mt-1">Operado por pessoa física no Brasil. Não é serviço de saúde ou emergência.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

const features = [
  {
    title: "Agendamento simples",
    icon: CalendarIcon,
    description: "Veja horários livres e solicite com antecedência mínima de 12 horas.",
    details: ["Calendário gerenciado pelo anfitrião", "Confirmação por e-mail", "Cancelamento a qualquer momento"],
  },
  {
    title: "Conversa de 15 min",
    icon: ClockIcon,
    description: "Duração padrão de 15 minutos, com opção de estender mais 15 min.",
    details: ["Temporizador controlado pelo servidor", "Extensão mediante pedido e aceite", "Encerramento a qualquer momento"],
  },
  {
    title: "Privacidade primeiro",
    icon: ShieldIcon,
    description: "Seu histórico fica disponível por 30 dias e você pode excluir quando quiser.",
    details: ["Histórico só seu, não do anfitrião", "Exclusão individual ou total", "Exportação de dados (LGPD)"],
  },
];

const steps = [
  { title: "Cadastre-se", description: "Crie sua conta e confirme o e-mail." },
  { title: "Escolha o horário", description: "Veja a agenda e solicite um horário livre." },
  { title: "Aguarde a confirmação", description: "O anfitrião aceita ou recusa a solicitação." },
  { title: "Converse", description: "No horário marcado, entre na sala e converse por 15 min." },
];

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  );
}