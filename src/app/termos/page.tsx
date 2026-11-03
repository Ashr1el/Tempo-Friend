import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de Uso do Tempo Friend - Plataforma de conversas de companhia",
};

export default function TermosPage() {
  const lastUpdated = "02 de novembro de 2026";
  const version = "1.0";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Voltar ao início
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Termos de Uso</h1>
          <p className="text-gray-600 dark:text-gray-400">Versão {version} — Atualizado em {lastUpdated}</p>
        </header>

        <Alert className="border-amber-200 bg-amber-50 dark:bg-amber-900/20">
          <AlertCircle className="w-4 h-4 mr-2" />
          <strong>Leia com atenção.</strong> Ao criar uma conta e usar o Tempo Friend, você concorda com estes termos.
          Se não concordar, não use a plataforma.
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>1. O que é o Tempo Friend</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>O Tempo Friend é uma plataforma que permite a pessoas adultas agendar conversas informais de companhia com um anfitrião, gratuitamente.</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Natureza:</strong> Conversas informais, sem finalidade clínica, terapêutica, médica, psicológica ou psiquiátrica.</li>
              <li><strong>Gratuidade:</strong> O cadastro, o agendamento e as conversas são gratuitos.</li>
              <li><strong>Duração:</strong> Cada conversa tem duração inicial de 15 minutos.</li>
              <li><strong>Extensão:</strong> Uma única extensão de até 15 minutos, mediante pedido do participante e aprovação do anfitrião.</li>
              <li><strong>Encerramento:</strong> Qualquer participante pode encerrar a conversa a qualquer momento.</li>
              <li><strong>Modalidades:</strong> Chat de texto (padrão). Áudio ao vivo, STT e TTS são opcionais e serão oferecidos em fase posterior.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Quem pode usar</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Pessoas com <strong>18 anos ou mais</strong>.</li>
              <li>Cadastro obrigatório com e-mail verificado.</li>
              <li>Confirmação de maioridade no momento do cadastro.</li>
              <li>Contas suspeitas de pertencer a menores podem ser suspensas para verificação.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Agendamento e confirmação</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>O anfitrião publica horários disponíveis.</li>
              <li>O participante solicita um horário (antecedência mínima: <strong>12 horas</strong>).</li>
              <li>A solicitação <strong>não garante a reserva</strong> — depende de aceite expresso do anfitrião.</li>
              <li>O anfitrião pode aceitar ou recusar livremente.</li>
              <li>Participante e anfitrião podem cancelar a qualquer momento.</li>
              <li>Não comparecimento ou atraso excessivo pode resultar em cancelamento automático.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Regras de conduta</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Durante o uso da plataforma, você concorda em <strong>não</strong>:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Praticar assédio, ameaças, discriminação ou violência.</li>
              <li>Compartilhar conteúdo ilegal, pornográfico ou que viole direitos de terceiros.</li>
              <li>Tentar obter dados pessoais, contatos externos ou informações sensíveis do outro participante.</li>
              <li>Fingir ser outra pessoa ou representar falsamente sua identidade.</li>
              <li>Usar a plataforma para oferecer ou simular atendimento profissional de saúde, terapia ou aconselhamento.</li>
              <li>Gravar áudio, vídeo ou tela da conversa sem consentimento expresso.</li>
              <li>Usar bots, automação ou scripts para interagir na plataforma.</li>
            </ul>
            <p>O descumprimento pode resultar em encerramento imediato da conversa, bloqueio da conta e denúncia às autoridades competentes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Histórico, privacidade e exclusão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>O participante autenticado pode consultar o histórico de suas próprias conversas por <strong>30 dias</strong> após o encerramento.</li>
              <li>O anfitrião <strong>não tem acesso rotineiro</strong> ao histórico dos participantes.</li>
              <li>Mensagens selecionadas pelo participante em uma denúncia são copiadas para um repositório de evidências com acesso restrito e prazo de retenção próprio.</li>
              <li>O participante pode solicitar <strong>exclusão de uma conversa individual ou de todo o histórico</strong> a qualquer momento.</li>
              <li>Exportação de dados disponível conforme LGPD.</li>
              <li>Backups seguem ciclo de expiração próprio, divulgado na Política de Privacidade.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Áudio, STT e TTS (fase posterior)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Áudio ao vivo sem vídeo, sem gravação por padrão.</li>
              <li>STT (fala para texto) e TTS (texto para fala) somente com ativação voluntária.</li>
              <li>O texto reconhecido só entra no histórico se o usuário confirmar/enviar.</li>
              <li>Fornecedores externos podem processar áudio/texto; isso será informado antes da primeira ativação.</li>
              <li>Não usar dados para treinamento de modelos por padrão.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Doações (opcional, fase posterior)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Contribuições via PIX são <strong>totalmente voluntárias</strong> e exibidas apenas após o encerramento da conversa.</li>
              <li>Não há contrapartida: doar <strong>não garante</strong> prioridade, agendamento, extensão ou qualquer benefício.</li>
              <li>O nome do titular da conta PIX pode ser exibido pelo banco do doador; isso será informado antes da transferência.</li>
              <li>Registro mínimo para conciliação contábil e obrigações legais.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Limites de responsabilidade</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>A plataforma é oferecida "como está", sem garantias de disponibilidade ininterrupta.</li>
              <li>Não somos serviço de emergência. Em risco imediato, procure SAMU (192) ou Polícia (190).</li>
              <li>Não nos responsabilizamos por conduta de terceiros, falhas de internet, ou decisões do anfitrião.</li>
              <li>Nossa responsabilidade limita-se ao permitido por lei.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Alterações e encerramento</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Podemos alterar estes termos a qualquer momento; versões anteriores ficam disponíveis.</li>
              <li>Alterações materiais serão notificadas por e-mail e na plataforma.</li>
              <li>Você pode encerrar sua conta a qualquer momento (exclusão de dados conforme Política de Privacidade).</li>
              <li>Podemos suspender ou encerrar contas que violem estes termos.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>10. Lei aplicável e contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Estes termos são regidos pelas leis do Brasil. Foro: comarca do domicílio do responsável pela plataforma.</p>
            <p>Dúvidas, solicitações LGPD ou denúncias: <a href="mailto:contato@tempo-friend.com" className="text-primary-600 hover:underline dark:text-primary-400">contato@tempo-friend.com</a></p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Responsável operacional: pessoa física, identificada nos documentos legais e canais obrigatórios.
              Marca pública: Tempo Friend.
            </p>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Tempo Friend. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}