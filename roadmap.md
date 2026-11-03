# Roadmap — Plataforma de conversas de companhia

**Status:** documento inicial de produto e planejamento.

**Escopo:** lançamento no Brasil, operação por pessoa física, cadastro obrigatório, participantes maiores de 18 anos, conversas individuais entre participante e anfitrião, sem vídeo e sem cobrança.

> **Nota:** este roadmap não é parecer jurídico. Termos, política de privacidade, tributação e fluxos de segurança devem ser revisados por advogado(a) e contador(a) antes do lançamento.

---

## 1. Visão do produto

Criar uma plataforma simples para que pessoas adultas possam agendar conversas informais de companhia com o anfitrião, gratuitamente, em horários previamente disponibilizados.

A plataforma não oferece atendimento médico, psicológico, psiquiátrico, terapêutico, aconselhamento profissional ou serviço de emergência. A proposta é exclusivamente proporcionar um espaço de conversa informal.

### Princípios

- Conversas e agendamentos gratuitos.
- Nenhuma obrigação de aceitar ou comparecer a um agendamento.
- O anfitrião pode aceitar ou recusar qualquer solicitação.
- Qualquer participante pode encerrar a conversa a qualquer momento.
- Duração padrão de 15 minutos.
- Uma única extensão de até 15 minutos, mediante solicitação do participante e aprovação do anfitrião.
- A extensão depende também da inexistência de conflito com outro agendamento.
- Doações opcionais, sem contrapartida ou influência sobre agendamento, duração ou prioridade.
- Sem chamadas de vídeo.
- Modo padrão: chat de texto.
- Recursos opcionais: áudio ao vivo, fala para texto (STT) e texto para fala (TTS).
- Histórico de chat disponível ao participante autenticado após a conversa, com prazo de retenção e exclusão definidos.
- Não gravar áudio ao vivo por padrão.
- STT/TTS somente com aviso claro sobre fornecedores e processamento; o texto enviado ao chat poderá integrar o histórico.

---

## 2. Fluxo principal

1. Visitante acessa a página inicial e lê a descrição e os limites do serviço.
2. Pessoa cria conta ou se identifica pelo mecanismo definido para o MVP.
3. Pessoa consulta horários livres.
4. Pessoa solicita um horário.
5. Anfitrião recebe a solicitação e aceita ou recusa.
6. Se aceita, o horário fica reservado e ambas as partes recebem confirmação.
7. No horário marcado, a sala de conversa é habilitada.
8. A conversa começa em chat; cada participante pode ativar os recursos de voz disponíveis.
9. Aos 14 minutos contados pelo servidor, o participante vê a opção de solicitar extensão.
10. Ao solicitar, o anfitrião recebe um pedido e escolhe aceitar ou recusar.
11. Se aprovado e sem conflito de agenda, a sessão é estendida por até 15 minutos.
12. A conversa termina quando o tempo acaba ou qualquer participante encerra.
13. Após o encerramento, a pessoa pode ver um convite discreto para fazer uma contribuição voluntária.
14. A pessoa pode avaliar a experiência ou reportar um problema, sem que isso seja condição para doar.

---

## 3. Regras funcionais

### 3.1 Agendamento

- Exibir somente horários efetivamente disponíveis.
- Usar fuso horário explícito, inicialmente America/Sao_Paulo.
- Impedir reservas duplicadas e sobreposição de sessões.
- Definir antecedência mínima, horizonte máximo de agendamento e intervalo entre sessões.
- Permitir cancelamento pelo participante e pelo anfitrião.
- Definir regras claras para atrasos e não comparecimento.
- Notificar as duas partes sobre confirmação, cancelamento e lembrete.
- Não revelar a terceiros a identidade ou o motivo de uma reserva.

### 3.2 Temporizador e extensão

- O servidor é a fonte oficial do horário de início e término; o relógio do navegador é apenas visual.
- Duração inicial: 15 minutos.
- Exibir o botão "Solicitar mais 15 minutos" somente quando faltarem 60 segundos ou menos para o fim do período inicial.
- O participante pode enviar no máximo uma solicitação de extensão por sessão.
- O anfitrião recebe uma notificação com as opções aceitar e recusar.
- A solicitação não estende automaticamente a sessão.
- Ao aceitar, o servidor verifica novamente a agenda e bloqueia atomicamente o intervalo adicional.
- Se houver conflito, a extensão não é permitida.
- Se o anfitrião não responder antes do término, a sessão termina no horário original.
- Extensão máxima: 15 minutos.
- A extensão não pode ser comprada nem condicionada a doação.
- Qualquer participante pode encerrar a sessão antes do término.

### 3.3 Modos de conversa

**MVP**

- Chat de texto em tempo real.
- Indicadores básicos de conexão.
- Controles de encerrar e reportar.
- Sem anexos, imagens ou compartilhamento de arquivos na primeira versão.

**Evolução**

- Áudio ao vivo, sem vídeo.
- STT para converter fala em texto, somente se habilitado pelo participante.
- TTS para ler mensagens de texto em voz alta, somente se habilitado.
- Indicar claramente quando um recurso utiliza fornecedor externo.
- Não guardar áudio nem transcrições por padrão.
- Oferecer alternativa de chat quando áudio ou acessibilidade falhar.

### 3.4 Doações

- Exibir convite somente após o encerramento, sem bloquear o uso do app.
- Informar o destino geral: ajudar a cobrir custos de infraestrutura e manutenção.
- Deixar claro que a contribuição é opcional e não compra serviço, prioridade ou extensão.
- Exibir valor e destinatário antes da confirmação.
- Emitir comprovante ou confirmação do meio de pagamento, conforme o provedor.
- Manter registro financeiro mínimo necessário para contabilidade e obrigações legais.
- Publicar política de cancelamento/estorno compatível com a lei e com as regras do meio de pagamento.
- Não afirmar que toda contribuição é irrevogável em qualquer hipótese.

---

## 4. Escopo recomendado do MVP

### Incluído

- Site responsivo.
- Cadastro e autenticação.
- Regra de maiores de 18 anos.
- Perfil mínimo do participante.
- Calendário de disponibilidade administrado pelo anfitrião.
- Solicitação, aprovação e cancelamento de agendamento.
- Chat em tempo real.
- Temporizador de 15 minutos controlado no servidor.
- Solicitação de extensão aos 14 minutos.
- Aprovação ou recusa da extensão pelo anfitrião.
- Encerramento por qualquer participante.
- Notificações essenciais.
- Convite opcional para doação após a sessão.
- Páginas de Termos de Uso, Privacidade, regras da comunidade e contato.
- Ferramenta administrativa para bloquear usuários e gerenciar horários.
- Logs técnicos e de segurança minimizados, sem conteúdo das conversas.

### Fora do MVP

- Vídeo.
- Conversas em grupo.
- Mensagens privadas fora de sessões agendadas.
- Gravação ou reprodução de conversas.
- Transcrição automática persistente.
- IA que analisa emoções, diagnostica ou recomenda tratamento.
- Marketplace ou múltiplos anfitriões.
- Assinaturas, créditos, pagamentos por minuto ou funcionalidades pagas.
- Aplicativos nativos para iOS e Android, até validar o produto web.

---

## 5. Roadmap por fases

### Fase 0 — Definição e validação

- [ ] Escolher nome, domínio e identidade visual.
- [ ] Definir se o serviço será operado como pessoa física ou pessoa jurídica.
- [ ] Definir público inicial: maiores de 18 anos.
- [ ] Definir horários, antecedência, intervalos e política de cancelamento.
- [ ] Definir limites de comportamento e motivos para interromper uma conversa.
- [ ] Desenhar fluxo de emergência e encaminhamento.
- [ ] Validar o modelo de doações com advogado(a) e contador(a).
- [ ] Mapear fornecedores de hospedagem, autenticação, mensagens, áudio e pagamentos.
- [ ] Fazer avaliação preliminar de privacidade e riscos.

**Critério de conclusão:** escopo, regras operacionais e riscos aceitos documentados.

### Fase 1 — Protótipo

- [ ] Criar wireframes da página inicial, calendário, sala e painel do anfitrião.
- [ ] Testar fluxo de reserva e cancelamento.
- [ ] Testar temporizador e pedido de extensão.
- [ ] Escrever microtextos de consentimento, aviso de limites e encerramento.
- [ ] Testar acessibilidade, navegação por teclado e experiência mobile.

**Critério de conclusão:** protótipo testado e fluxo compreendido por usuários de teste.

### Fase 2 — MVP web

- [ ] Implementar autenticação e verificação de idade adequada ao risco.
- [ ] Implementar calendário e bloqueio contra reservas simultâneas.
- [ ] Implementar painel do anfitrião.
- [ ] Implementar chat em tempo real.
- [ ] Implementar temporizador no servidor.
- [ ] Implementar solicitação de extensão aos 14 minutos.
- [ ] Implementar decisão do anfitrião e verificação de conflito de agenda.
- [ ] Implementar encerramento por qualquer lado.
- [ ] Implementar notificações.
- [ ] Implementar reportar, bloquear e suporte.
- [ ] Publicar páginas legais revisadas.
- [ ] Configurar monitoramento, backups e proteção contra abuso.

**Critério de conclusão:** testes ponta a ponta aprovados, sem possibilidade conhecida de reserva duplicada ou extensão indevida.

### Fase 3 — Piloto fechado

- [ ] Convidar pequeno grupo de adultos.
- [ ] Limitar quantidade de horários disponíveis.
- [ ] Testar conexões ruins, desconexões e reconexões.
- [ ] Testar cancelamento, atraso e não comparecimento.
- [ ] Testar fim de sessão e extensão em casos de conflito.
- [ ] Testar denúncias, bloqueios e incidentes.
- [ ] Coletar feedback sem registrar conteúdo íntimo das conversas.
- [ ] Corrigir problemas de usabilidade e segurança.

**Critério de conclusão:** piloto estável e processo operacional sustentável para o anfitrião.

### Fase 4 — Doações e recursos de voz

- [ ] Escolher provedor de pagamento e confirmar regras para contribuições voluntárias.
- [ ] Implementar convite pós-conversa, sem pressão.
- [ ] Exibir claramente valor, destinatário e finalidade declarada.
- [ ] Implementar confirmação e conciliação financeira.
- [ ] Integrar áudio ao vivo sem vídeo.
- [ ] Integrar STT e TTS com controles claros.
- [ ] Revisar contratos, retenção e transferência internacional de dados dos fornecedores.
- [ ] Fazer testes de acessibilidade e privacidade.

**Critério de conclusão:** doações não afetam o acesso ao serviço e recursos de voz funcionam com transparência e consentimento.

### Fase 5 — Lançamento público e manutenção

- [ ] Publicar página de transparência sobre funcionamento e limites.
- [ ] Definir canal de contato e prazo operacional de resposta.
- [ ] Revisar periodicamente segurança e privacidade.
- [ ] Acompanhar disponibilidade, falhas, cancelamentos e denúncias.
- [ ] Rever custos de infraestrutura e contribuições recebidas.
- [ ] Atualizar termos e políticas quando houver mudanças relevantes.
- [ ] Avaliar demanda antes de adicionar novos anfitriões ou recursos.

---

## 6. Arquitetura técnica — referência inicial

A arquitetura detalhada e o modelo de dados foram definidos em `arquitetura_tecnica_banco_de_dados.md`. A referência inicial é uma aplicação web responsiva com backend modular e PostgreSQL:

- **Frontend:** aplicação web responsiva.
- **Backend:** API com autenticação, agenda e regras de sessão.
- **Banco de dados:** PostgreSQL.
- **Tempo real:** serviço gerenciado de realtime/WebSocket para chat, com autorização por sessão.
- **Áudio:** WebRTC ou fornecedor especializado, sem vídeo.
- **Notificações:** e-mail e notificações web, com consentimento e controles.
- **Doações:** PIX direto somente depois de validar a exposição do nome civil e o enquadramento fiscal; não tentar ocultar o titular de forma enganosa.
- **Hospedagem:** provedor com controles de acesso, criptografia, backups e região de dados avaliada.
- **Observabilidade:** métricas técnicas sem registrar o conteúdo das conversas.

### Entidades principais

- `users`: conta, e-mail, estado de verificação de idade e preferências.
- `availability_slots`: horários disponibilizados pelo anfitrião.
- `bookings`: solicitante, horário, estado e decisão do anfitrião.
- `sessions`: início, fim previsto, fim efetivo e estado.
- `extension_requests`: solicitação, horário, decisão e resultado da verificação de agenda.
- `reports`: denúncias e providências administrativas, com acesso restrito.
- `donations`: valor, moeda, estado do pagamento, provedor e referência financeira.
- `consents`: versão dos termos e políticas aceitas, data e finalidade.

Armazenar o histórico de chat por 30 dias, conforme decisão do responsável, com exclusão individual e global solicitável pelo participante. Acesso do anfitrião restrito a mensagens selecionadas pelo participante em uma denúncia, com exceções legais e de segurança documentadas. Não gravar áudio ao vivo por padrão.

---

## 7. Requisitos de segurança e privacidade

- Criptografia em trânsito e em repouso.
- Controle de acesso administrativo e autenticação forte para o anfitrião.
- Separação entre dados de conta, agenda, denúncias e dados financeiros.
- Minimização de dados e prazos de retenção definidos.
- Processo para atender solicitações dos titulares da LGPD.
- Contratos e avaliação dos operadores/fornecedores.
- Política de resposta a incidentes e comunicação quando exigida.
- Rate limiting, proteção contra spam e abuso.
- Proteção contra enumeração de contas e exposição de agenda.
- Não registrar conteúdo de mensagens em logs técnicos.
- Não gravar áudio por padrão.
- Não utilizar conversas para treinamento de modelos.
- Backups protegidos e rotina de restauração testada.

---

## 8. Documentos jurídicos e operacionais

Antes do lançamento, preparar e revisar:

1. **Termos de Uso:** natureza informal do serviço, gratuidade, agendamento sujeito à aceitação, duração, extensão, encerramento, conduta, suspensão e limites.
2. **Política de Privacidade:** dados coletados, finalidades, bases legais, fornecedores, compartilhamentos, retenção, direitos e canal de contato.
3. **Aviso de não atendimento profissional:** deixar claro que não é serviço de saúde ou emergência.
4. **Regras da Comunidade:** respeito, assédio, ameaças, conteúdo ilegal, contato externo e consequências.
5. **Política de Doações:** voluntariedade, finalidade, ausência de contrapartida e regras legais de estorno.
6. **Política de Segurança e Incidentes:** denúncias, bloqueios, ameaças e situações de risco.
7. **Aviso de áudio e transcrição:** explicar tecnologias, fornecedores, processamento e se algum dado é armazenado.
8. **Registro das decisões de privacidade:** inventário de dados, fornecedores, retenção e avaliação de riscos.

---

## 9. Diretrizes de redação jurídica — pontos para validação profissional

**Natureza do serviço**
A plataforma disponibiliza um espaço para conversas informais de companhia, sem finalidade clínica, terapêutica, médica, psicológica, psiquiátrica ou de aconselhamento profissional. Não são realizados diagnósticos, tratamentos ou avaliações de saúde.

**Gratuidade e disponibilidade**
O uso da plataforma e a solicitação de horários são gratuitos. Todo agendamento depende de disponibilidade e aceitação expressa do anfitrião. O envio de uma solicitação não garante sua confirmação.

**Duração e encerramento**
Cada conversa tem duração inicial prevista de 15 minutos. Próximo ao encerramento, o participante poderá solicitar uma única extensão de até 15 minutos. A extensão depende de aprovação expressa do anfitrião e da disponibilidade de agenda. Qualquer participante pode encerrar a conversa a qualquer momento.

**Doações**
As contribuições são facultativas e não constituem condição de acesso, pagamento por conversa, aquisição de prioridade ou garantia de extensão. Sua finalidade é auxiliar nos custos de operação e manutenção da plataforma. As regras de cancelamento e estorno observarão a legislação aplicável e as condições do meio de pagamento.

**Limites e emergências**
A plataforma não é serviço de emergência e não substitui atendimento profissional. Em situação de risco imediato, o participante deve procurar os serviços públicos de emergência ou profissionais habilitados.

> **Atenção:** esses textos são pontos de partida, não cláusulas prontas para publicação. Não use uma renúncia genérica de responsabilidade para tentar afastar direitos legais ou responsabilidade por falhas próprias.

---

## 10. Riscos que precisam de decisão antes do lançamento

- **Expectativa de vínculo:** explicar que a conversa é pontual e não garante disponibilidade futura.
- **Dependência emocional:** evitar promessas de amizade permanente, exclusividade ou contato pessoal contínuo.
- **Crise ou ameaça:** estabelecer protocolo realista; não prometer intervenção que o anfitrião não pode prestar.
- **Assédio e segurança pessoal:** permitir bloqueio, denúncia e encerramento imediato.
- **Privacidade:** evitar coleta de dados sensíveis e gravação.
- **Doações por PIX em nome de pessoa física:** separar totalmente contribuição de acesso e benefícios; manter comprovantes e conciliação; validar ITCMD estadual, declaração de IR e eventual caracterização tributária com contador(a).
- **Responsabilidade:** termos não eliminam deveres legais nem responsabilidade por conduta própria.
- **Menores:** manter o MVP restrito a maiores de 18 anos.

---

## 11. Métricas de sucesso

Priorizar indicadores operacionais e de segurança, não métricas que incentivem conversas mais longas ou doações maiores:

- Taxa de agendamentos confirmados.
- Taxa de cancelamento e não comparecimento.
- Falhas técnicas por sessão.
- Percentual de sessões encerradas corretamente.
- Pedidos de extensão e decisões, apenas para planejamento operacional.
- Denúncias e tempo de tratamento.
- Custo mensal de infraestrutura.
- Total de contribuições voluntárias e proporção dos custos cobertos.

Não usar duração da conversa ou valor doado como medida de qualidade do participante.

---

## 12. Decisões em aberto

- Nome e domínio do projeto.
- Pessoa física ou jurídica como responsável pela operação.
- Cadastro obrigatório ou agendamento com conta simplificada.
- Verificação de idade e prevenção de contas abusivas.
- Antecedência mínima e janela máxima de agendamento.
- Intervalo entre sessões.
- Política de atraso e não comparecimento.
- Canal de notificação.
- Provedor de áudio e política de processamento.
- Provedor de doação e tratamento contábil/tributário.
- Se haverá histórico de chat; recomendação inicial: não.
- Procedimento de emergência e limites de disponibilidade do anfitrião.

> As seções 14 e 15 abaixo registram decisões posteriores que prevalecem sobre itens desta lista (por exemplo, o histórico de chat passou a existir, com retenção de 30 dias).

---

## 13. Referências legais iniciais — Brasil

- **LGPD — Lei nº 13.709/2018:** tratamento de dados pessoais, dados sensíveis, direitos dos titulares e deveres dos agentes de tratamento. Texto atualizado: https://www2.camara.leg.br/legin/fed/lei/2018/lei-13709-14-agosto-2018-787077-normaatualizada-pl.html
- **Marco Civil da Internet — Lei nº 12.965/2014:** direitos, privacidade, registros e responsabilidades no uso de aplicações de internet. Texto: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm
- **Código Civil — Lei nº 10.406/2002:** obrigações, responsabilidade civil e regras sobre doação, inclusive arts. 538 e seguintes e 555 a 557. Texto: https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm
- **Código de Defesa do Consumidor — Lei nº 8.078/1990:** avaliar com advogado(a) a incidência no modelo concreto, inclusive diante da gratuidade e de eventual vantagem econômica indireta.

As referências acima são um ponto de partida. A aplicação concreta depende do modelo operacional, da forma de captação de doações, dos fornecedores, do conteúdo efetivamente oferecido e da forma de divulgação.

### Próximo passo recomendado

Fechar as decisões em aberto da seção 12 e transformar este roadmap em especificação funcional. Antes de aceitar usuários reais, submeter os documentos jurídicos e o fluxo de doações a revisão profissional.

---

## 14. Configuração confirmada pelo responsável do projeto

- Operação inicial em nome de pessoa física.
- Cadastro obrigatório.
- Histórico de mensagens acessível ao participante.
- Chat, áudio ao vivo, STT e TTS.
- Doações por PIX diretamente ao responsável.
- Público restrito a maiores de 18 anos.

### Consequências dessas escolhas

1. O responsável deve aparecer de forma transparente nos termos e na política de privacidade, com canal de contato.
2. O histórico passa a ser uma base de dados de conteúdo de comunicação. Deve haver prazo de retenção, controles de acesso, exportação/exclusão e procedimento de backup.
3. O anfitrião não deve consultar rotineiramente o histórico privado dos participantes. A política deve explicar, de modo verdadeiro, qualquer acesso técnico/administrativo e o tratamento de mensagens incluídas em denúncias.
4. Áudio ao vivo não deve ser gravado por padrão. STT e TTS podem envolver envio de dados a fornecedores externos; informar isso antes da ativação.
5. PIX direto pode expor ao pagador o nome civil do titular da conta. A interface deve avisar isso antes de abrir o aplicativo bancário.
6. Contribuições recebidas por pessoa física exigem organização documental e análise tributária. Não presumir que a palavra "doação" afasta ITCMD ou outras obrigações.
7. Cadastro obrigatório deve coletar o mínimo: e-mail, credencial segura, apelido público e confirmação de maioridade. Evitar coletar CPF e documento de identidade sem necessidade justificada.

---

## 15. Decisões adicionais confirmadas

- **Retenção do histórico:** 30 dias após o encerramento da sessão.
- **Acesso do anfitrião ao conteúdo:** somente mensagens incluídas pelo participante em uma denúncia; qualquer exceção legal deve ser tratada separadamente e registrada.
- **Exclusão:** participante pode excluir uma conversa individual ou todo o histórico.
- **PIX:** o responsável prefere não expor seu nome civil; avaliar alternativa legítima com PSP/intermediador e assessoria jurídica/contábil. Não prometer anonimato do recebedor nem contornar identificação exigida pelo sistema financeiro.
- **Antecedência mínima para agendamento:** 12 horas antes do início.
- **Identidade pública:** marca do aplicativo. A identificação legal do controlador continuará disponível nos documentos e canais em que a lei exigir.

**Implicações:** configurar expurgo automático aos 30 dias; separar histórico de mensagens de evidências de denúncia; manter cópias de evidência somente pelo prazo necessário e com acesso restrito; implementar exclusão individual e global; bloquear no backend reservas cuja antecedência seja inferior a 12 horas.
