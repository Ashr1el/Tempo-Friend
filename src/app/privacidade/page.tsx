import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de Privacidade do Tempo Friend - Como tratamos seus dados",
};

export default function PrivacidadePage() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Política de Privacidade</h1>
          <p className="text-gray-600 dark:text-gray-400">Versão {version} — Atualizado em {lastUpdated}</p>
        </header>

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <AlertCircle className="w-4 h-4 mr-2" />
          Esta política explica quais dados coletamos, para que servem, com quem compartilhamos,
          seus direitos (LGPD) e como exercê-los.
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>1. Controlador e contato</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p><strong>Responsável (controlador):</strong> Pessoa física, operando sob a marca Tempo Friend.</p>
            <p><strong>Canal LGPD / DPO:</strong> <a href="mailto:contato@tempo-friend.com" className="text-primary-600 hover:underline dark:text-primary-400">contato@tempo-friend.com</a></p>
            <p>A identificação legal completa do controlador consta nos Termos de Uso e canais obrigatórios.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Dados que coletamos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left pb-2 font-medium">Categoria</th>
                  <th className="text-left pb-2 font-medium">Exemplos</th>
                  <th className="text-left pb-2 font-medium">Finalidade</th>
                  <th className="text-left pb-2 font-medium">Base legal (LGPD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-2 font-medium">Cadastro</td>
                  <td>E-mail, nome de exibição, hash de senha / ID do provedor</td>
                  <td>Criar e gerenciar conta, autenticação</td>
                  <td>Execução de contrato / procedimentos preliminares (art. 7º, V)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Maioridade</td>
                  <td>Confirmação de 18+ (data/flag)</td>
                  <td>Restringir a maiores de 18 anos</td>
                  <td>Cumprimento de obrigação legal (art. 7º, II)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Agenda</td>
                  <td>Horários solicitados, status, cancelamentos</td>
                  <td>Gerenciar reservas, evitar conflitos</td>
                  <td>Execução de contrato (art. 7º, V)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Conversas</td>
                  <td>Texto das mensagens (chat)</td>
                  <td>Histórico do participante (30 dias)</td>
                  <td>Execução de contrato / legítimo interesse (art. 7º, V / IX)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Áudio (futuro)</td>
                  <td>Fluxo de áudio ao vivo (WebRTC)</td>
                  <td>Conversa em tempo real</td>
                  <td>Execução de contrato / consentimento (art. 7º, V / I)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">STT/TTS (futuro)</td>
                  <td>Áudio p/ transcrição; texto p/ síntese</td>
                  <td>Recursos de acessibilidade</td>
                  <td>Consentimento específico (art. 7º, I)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Segurança</td>
                  <td>Logs de acesso, denúncias, bloqueios</td>
                  <td>Prevenção a abuso, investigação</td>
                  <td>Legítimo interesse / exercício regular de direitos (art. 7º, IX / VI)</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium">Doações (futuro)</td>
                  <td>Valor, data, referência bancária</td>
                  <td>Conciliação contábil e fiscal</td>
                  <td>Cumprimento de obrigação legal (art. 7º, II)</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              <strong>Não coletamos:</strong> CPF, documento de identidade, endereço, telefone, foto, dados de saúde,
              dados biométricos, localização precisa, contatos do dispositivo.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Retenção e exclusão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Conta:</strong> Enquanto ativa; após exclusão, anonimização/exclusão em até 30 dias, ressalvadas obrigações legais.</li>
              <li><strong>Histórico de chat:</strong> 30 dias após encerramento da sessão; exclusão individual ou total a pedido do titular.</li>
              <li><strong>Evidências de denúncia:</strong> Prazo próprio, proporcional ao risco e a eventuais disputas (mínimo 1 ano).</li>
              <li><strong>Logs de segurança:</strong> 90 dias.</li>
              <li><strong>Dados fiscais/financeiros:</strong> Conforme orientação contábil (mínimo 5 anos).</li>
              <li><strong>Backups:</strong> Ciclo de expiração limitado; não prometemos exclusão instantânea de cópias imutáveis.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Compartilhamento e fornecedores</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Supabase:</strong> Hospedagem do banco (PostgreSQL), Auth, Realtime — processador de dados.</li>
              <li><strong>Vercel:</strong> Hospedagem do frontend — processador de dados.</li>
              <li><strong>Resend:</strong> E-mails transacionais — processador de dados.</li>
              <li><strong>Fornecedores de áudio/STT/TTS (futuro):</strong> Serão listados aqui antes da ativação, com região de processamento e política de retenção.</li>
              <li><strong>Autoridades:</strong> Quando exigido por lei, ordem judicial ou para proteger direitos/vida.</li>
            </ul>
            <p>Não vendemos, alugamos ou compartilhamos dados para publicidade ou treinamento de IA.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Transferências internacionais</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Nossos fornecedores podem processar dados fora do Brasil (EUA, Europa). Exigimos:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Cláusulas contratuais padrão (SCCs) ou adequação ANPD.</li>
              <li>Medidas de segurança equivalentes.</li>
              <li>Notificação de incidentes.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Seus direitos (LGPD — art. 18)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Você pode solicitar, a qualquer momento:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmação e acesso aos seus dados.</li>
              <li>Correção de dados incompletos, inexatos ou desatualizados.</li>
              <li>Anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade.</li>
              <li>Portabilidade dos dados a outro fornecedor (mediante requisição expressa).</li>
              <li>Informação sobre compartilhamento com terceiros.</li>
              <li>Revogação do consentimento (quando aplicável).</li>
              <li>Revisão de decisões automatizadas (se houver).</li>
            </ul>
            <p>Para exercer seus direitos: <a href="mailto:contato@tempo-friend.com" className="text-primary-600 hover:underline dark:text-primary-400">contato@tempo-friend.com</a>.</p>
            <p>Responderemos em até 15 dias, prorrogáveis por mais 15 se necessário.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>TLS 1.2+ em todas as conexões.</li>
              <li>Criptografia em repouso no banco e backups.</li>
              <li>Row Level Security (RLS) no PostgreSQL — isolamento entre usuários.</li>
              <li>MFA obrigatório para conta do anfitrião.</li>
              <li>Rate limiting, proteção contra enumeração e credential stuffing.</li>
              <li>Logs sem conteúdo de mensagens, áudio, tokens ou senhas.</li>
              <li>Plano de resposta a incidentes e notificação à ANPD/titulares quando cabível.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>8. Cookies e métricas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Cookies estritamente necessários: sessão, autenticação, CSRF.</li>
              <li>Não usamos cookies de publicidade, rastreamento cross-site ou analytics de terceiros.</li>
              <li>Métricas técnicas (erros, latência) sem dados pessoais.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>9. Alterações desta política</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Atualizações serão publicadas nesta página com nova versão e data. Alterações materiais serão notificadas por e-mail.</p>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Tempo Friend. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}