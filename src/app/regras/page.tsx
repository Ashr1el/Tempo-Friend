import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { AlertCircle, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Regras da Comunidade",
  description: "Regras da Comunidade do Tempo Friend - Conduta esperada e consequências",
};

export default function RegrasPage() {
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Regras da Comunidade</h1>
          <p className="text-gray-600 dark:text-gray-400">Versão {version} — Atualizado em {lastUpdated}</p>
        </header>

        <Alert className="border-blue-200 bg-blue-50 dark:bg-blue-900/20">
          <AlertCircle className="w-4 h-4 mr-2" />
          Estas regras valem para <strong>todos</strong> — participantes e anfitrião.
          O descumprimento pode levar a encerramento de conversa, bloqueio temporário ou permanente.
        </Alert>

        <Card>
          <CardHeader>
            <CardTitle>1. Respeito básico</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Trate o outro com educação e cordialidade.</li>
              <li>Não use linguagem ofensiva, discriminatória, ameaçadora ou assediante.</li>
              <li>Não faça comentários sobre aparência, origem, religião, orientação sexual, identidade de gênero, deficiência ou condição social.</li>
              <li>Não pressione o outro a revelar informações pessoais, contatos ou dados sensíveis.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>2. Segurança e limites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Não é terapia:</strong> Não use a conversa para buscar diagnóstico, tratamento, aconselhamento clínico ou emergência.</li>
              <li><strong>Emergência:</strong> Em risco imediato, encerre a conversa e ligue para SAMU (192) ou Polícia (190). O CVV (188) oferece apoio emocional, não substitui emergência médica.</li>
              <li><strong>Menores:</strong> A plataforma é exclusiva para maiores de 18 anos. Se suspeitar que o outro é menor, encerre e denuncie.</li>
              <li><strong>Contato externo:</strong> Não peça nem ofereça telefone, e-mail pessoal, redes sociais, endereço ou encontros presenciais.</li>
              <li><strong>Gravação:</strong> Não grave áudio, vídeo ou tela sem consentimento expresso e mútuo.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>3. Condutas proibidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Assédio, stalking, perseguição ou intimidação.</li>
              <li>Ameaças de violência, autoflagelação ou dano a terceiros.</li>
              <li>Conteúdo ilegal (apologia a crimes, pornografia infantil, tráfico, etc.).</li>
              <li>Fraude, golpe, falsidade ideológica, uso de identidade alheia.</li>
              <li>Tentativa de simular atendimento profissional de saúde/psicologia.</li>
              <li>Spam, autopromoção, venda de produtos/serviços.</li>
              <li>Uso de bots, scripts ou automação para interagir.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Denúncia e bloqueio</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Qualquer participante pode <strong>denunciar</strong> durante ou após a conversa.</li>
              <li>Ao denunciar, você escolhe a categoria e pode anexar mensagens específicas como evidência.</li>
              <li>O anfitrião pode <strong>bloquear preventivamente</strong> e encerrar a sessão imediatamente se houver risco.</li>
              <li>Denúncias são analisadas individualmente; medidas proporcionais são aplicadas.</li>
              <li>Bloqueios podem ser temporários ou permanentes, com direito a recurso.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>5. Consequências</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left pb-2 font-medium">Gravidade</th>
                  <th className="text-left pb-2 font-medium">Exemplos</th>
                  <th className="text-left pb-2 font-medium">Medida típica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                <tr>
                  <td className="py-2">Leve</td>
                  <td>Linguagem inadequada, insistência leve em contato</td>
                  <td className="text-amber-700 dark:text-amber-300">Aviso, encerramento da sessão</td>
                </tr>
                <tr>
                  <td className="py-2">Moderada</td>
                  <td>Assédio, ameaça não iminente, falsidade, menor suspeito</td>
                  <td className="text-orange-700 dark:text-orange-300">Bloqueio temporário (7–30 dias)</td>
                </tr>
                <tr>
                  <td className="py-2">Grave</td>
                  <td>Ameaça iminente, conteúdo ilegal, fraude, simulação de terapia</td>
                  <td className="text-red-700 dark:text-red-300">Bloqueio permanente, denúncia a autoridades</td>
                </tr>
              </tbody>
            </table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>6. Recursos e revisão</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Bloqueios podem ser contestados por e-mail: <a href="mailto:contato@tempo-friend.com" className="text-primary-600 hover:underline dark:text-primary-400">contato@tempo-friend.com</a>.</li>
              <li>Revisão em até 15 dias úteis.</li>
              <li>Decisões de bloqueio permanente por conteúdo ilegal ou ameaça iminente não são reversíveis.</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>7. Alterações</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>Atualizações serão publicadas aqui com nova versão e data. Alterações materiais serão notificadas.</p>
          </CardContent>
        </Card>

        <footer className="text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Tempo Friend. Todos os direitos reservados.</p>
        </footer>
      </div>
    </div>
  );
}