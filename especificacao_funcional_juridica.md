# Especificação funcional e jurídica preliminar

**Plataforma de conversas de companhia — Brasil**

- **Versão:** 1.0 — 02/11/2026
- **Responsável operacional pretendido:** pessoa física
- **Público:** maiores de 18 anos
- **Modelo:** agendamento gratuito de conversas individuais com anfitrião, sujeitas à aceitação.

> **Aviso:** documento de produto e análise preliminar. Não substitui parecer jurídico, contábil ou de segurança da informação.

---

# PARTE A — ESPECIFICAÇÃO FUNCIONAL

## 1. Objetivo

Permitir que um adulto solicite um horário gratuito para conversar informalmente com o anfitrião. O anfitrião pode aceitar ou recusar. A conversa dura inicialmente 15 minutos e pode ser estendida uma única vez por até 15 minutos, mediante pedido do participante, aceite expresso do anfitrião e ausência de conflito de agenda.

A modalidade padrão é chat. A plataforma também oferece áudio ao vivo, fala para texto (STT) e texto para fala (TTS), sem vídeo.

O produto não é serviço de saúde, psicoterapia, aconselhamento profissional, linha de crise ou serviço de emergência.

## 2. Papéis e permissões

### 2.1 Visitante

- Pode visualizar a explicação do serviço, regras, política de privacidade e horários públicos disponíveis.
- Não pode reservar até criar e confirmar uma conta.

### 2.2 Participante autenticado

- Pode editar dados básicos da conta.
- Pode consultar horários livres.
- Pode solicitar, cancelar e consultar seus próprios agendamentos.
- Pode entrar somente nas sessões das quais participa.
- Pode enviar e receber mensagens durante a sessão.
- Pode consultar o histórico de suas próprias conversas.
- Pode solicitar exportação e exclusão de dados, nos limites legais.
- Pode solicitar extensão, encerrar sessão e reportar conteúdo/comportamento.
- Pode fazer contribuição PIX opcional depois da sessão.

### 2.3 Anfitrião / administrador

- Pode cadastrar e bloquear horários.
- Pode aceitar ou recusar solicitações.
- Pode cancelar sessões, com notificação ao participante.
- Pode iniciar/encerrar sessões e decidir pedidos de extensão.
- Pode bloquear contas e tratar denúncias.
- Pode acessar dados administrativos necessários.
- Não deve navegar rotineiramente pelo conteúdo histórico dos participantes. Qualquer acesso excepcional deve ter finalidade documentada, controle de permissão e registro de auditoria.

> **Nota de transparência:** se o operador da plataforma ou um administrador tecnicamente puder acessar mensagens armazenadas, a política de privacidade não pode afirmar que o histórico é inacessível ao operador. O produto deve descrever o acesso real, não apenas a intenção.

## 3. Cadastro e maioridade

### Campos mínimos sugeridos

- E-mail.
- Senha armazenada por hash seguro ou autenticação por provedor confiável.
- Nome de exibição/apelido.
- Data de nascimento ou mecanismo proporcional de confirmação de 18 anos.
- Aceite versionado dos Termos de Uso e ciência da Política de Privacidade.
- Preferências de comunicação.

Evitar CPF, endereço residencial, documento de identidade, telefone e fotografia, salvo se houver finalidade concreta e avaliação de necessidade.

### Regras

- A conta exige confirmação de e-mail.
- O usuário declara e confirma ter 18 anos ou mais.
- O mecanismo de verificação deve ser proporcional ao risco. Uma simples caixa de seleção pode ser insuficiente para certos cenários; a necessidade de verificação adicional deve ser avaliada juridicamente.
- Conta suspeita de pertencer a menor pode ser suspensa e encaminhada a um processo de verificação que minimize os dados coletados.
- Não armazenar cópia de documento se uma verificação por terceiro puder retornar apenas um sinal de "maior de 18" e houver contrato adequado.

## 4. Disponibilidade e agendamento

### Regras

- O anfitrião configura janelas de disponibilidade.
- O sistema mostra somente horários realmente livres.
- Cada reserva ocupa um intervalo de 15 minutos, mais eventual margem de segurança configurada.
- O fuso horário deve ser explícito. Sugestão inicial: America/Sao_Paulo, com apresentação local ao usuário.
- O servidor é a fonte oficial do horário.
- Não permitir duas reservas sobrepostas.
- Solicitação de horário não é confirmação: só fica confirmada após aceite do anfitrião.
- O participante recebe confirmação, lembrete e atualizações.
- Participante e anfitrião podem cancelar.
- Definir prazo mínimo de antecedência, horizonte de agendamento e política de atraso antes do lançamento.
- Se o anfitrião não comparecer ou não iniciar a sessão, o participante recebe aviso e pode reportar o problema.

### Estados da reserva

```
requested → accepted ou declined
accepted → cancelled_by_user, cancelled_by_host, expired, completed, no_show
```

A mudança de estado deve ser registrada com data, ator e motivo categorizado quando necessário.

## 5. Sala de conversa

### Entrada

- A sala só é habilitada para as duas contas envolvidas.
- A sessão deve estar vinculada a uma reserva aceita.
- O usuário vê o horário previsto de término e as regras resumidas.
- O chat é a modalidade inicial e não exige ativação de microfone.

### Chat

- Mensagens de texto em tempo real.
- Identificação do remetente e horário.
- Histórico disponível ao participante autenticado.
- Histórico não deve ser público nem indexável.
- Sem anexos no MVP.
- Permitir denunciar mensagem ou sessão.
- Mensagens removidas pelo usuário podem desaparecer de sua visualização, mas o produto deve esclarecer se e por quanto tempo cópias técnicas, backups ou itens denunciados permanecem retidos.

### Histórico

**Decisão confirmada:** o participante poderá consultar suas conversas anteriores.

Requisitos:

- Acesso autenticado e autorizado por participante da sessão.
- Um participante não pode acessar a conversa de outro.
- O anfitrião não terá uma tela de consulta rotineira de todos os históricos.
- Acesso excepcional por suporte/segurança deve ser restrito, justificado e auditável.
- O usuário deve conseguir excluir uma conversa individual ou todo o histórico, observadas retenções legais, prevenção a fraude, segurança, exercício regular de direitos e preservação de evidências em caso de denúncia. A exclusão deve alcançar os sistemas ativos e seguir o ciclo documentado de expiração dos backups.
- Definir prazo de retenção antes de abrir o serviço. Não adotar "guardar para sempre".
- Oferecer exportação em formato legível.
- Backups devem ter ciclo de expiração conhecido; exclusão não deve ser anunciada como instantânea se cópias de segurança persistirem temporariamente.

### Encerramento

- Qualquer participante pode encerrar a sessão a qualquer momento.
- A interface pede confirmação apenas quando houver risco de toque acidental, sem dificultar o encerramento.
- Ao encerrar, a sala fica somente para leitura ou é fechada conforme regra definida.
- O histórico é persistido conforme a política publicada.
- O participante vê o convite de doação opcional, sem pressão.

## 6. Temporizador e extensão

### Linha do tempo

- **T0:** início oficial da sessão, registrado no servidor.
- **T0 + 14 min:** exibir ao participante o botão "Solicitar mais 15 minutos".
- **T0 + 15 min:** sessão inicial termina, salvo extensão aprovada antes do fim.
- Se aprovada, novo término: **T0 + 30 min**.

### Regras de extensão

1. Uma solicitação por sessão.
2. O participante inicia o pedido.
3. O anfitrião recebe aviso e escolhe aceitar ou recusar.
4. O aceite exige verificação de agenda no servidor.
5. A verificação deve bloquear atomicamente o período adicional, evitando corrida com outra reserva.
6. A extensão não é automática.
7. Ausência de resposta até o término equivale a não aprovação.
8. Se houver conflito, o pedido é recusado e a sessão termina no horário original.
9. Não há pagamento, contribuição ou outro benefício associado à extensão.
10. O anfitrião pode encerrar mesmo após aprovar a extensão.

### Casos de falha

- **Perda de conexão:** manter o relógio no servidor; permitir reconexão durante o período restante.
- **Navegador em segundo plano:** o contador se recalcula com base no horário do servidor.
- **Notificação não entregue:** a falta de notificação não altera o término.
- **Duas ações simultâneas:** a primeira operação válida no servidor prevalece; registrar resultado.
- **Reinício do servidor:** estado da sessão deve ser recuperado do banco, não de memória local.

## 7. Áudio, STT e TTS

### Áudio ao vivo

- Sem vídeo.
- Sem gravação por padrão.
- Solicitar permissão do microfone no momento de ativação.
- Exibir indicador visual de microfone ativo.
- Permitir desligar microfone e retornar ao chat.
- Utilizar conexão segura e autenticação por sessão.
- Preferir infraestrutura de retransmissão de mídia (TURN relay) quando necessário para reduzir exposição direta de endereços IP entre participantes.
- Informar se o fornecedor de áudio processa metadados de conexão e em que região.

### STT — fala para texto

- A ativação deve ser voluntária.
- Informar que o áudio pode ser enviado a um fornecedor para transcrição.
- O áudio não deve ser salvo pelo app por padrão.
- O texto reconhecido só entra no histórico se o usuário confirmar/enviar como mensagem, ou se a interface deixar isso inequívoco.
- Permitir corrigir o texto antes de enviar.
- Informar que o reconhecimento pode errar.

### TTS — texto para fala

- A ativação deve ser voluntária.
- Informar se o texto é enviado a fornecedor externo.
- Não enviar conteúdo para treinamento ou melhoria de modelos por padrão; verificar e contratar essa condição com o fornecedor.
- Não manter áudio sintetizado após a reprodução, salvo necessidade técnica claramente informada.

### Fornecedores

Antes de contratar:

- Identificar controlador, operador e suboperadores.
- Avaliar localização de armazenamento e processamento.
- Avaliar transferências internacionais.
- Verificar retenção de áudio/texto pelo fornecedor.
- Exigir medidas de segurança e notificação de incidentes.
- Verificar se dados são usados para treinamento.
- Publicar os fornecedores relevantes na política de privacidade ou em página atualizada.

## 8. Doações por PIX

### Fluxo sugerido

1. Sessão é encerrada.
2. A tela informa que a conversa foi gratuita.
3. Aparece mensagem discreta: "Se quiser ajudar a manter os custos da plataforma, você pode contribuir voluntariamente".
4. Usuário escolhe abrir o app bancário ou copiar a chave/PIX.
5. Antes da transferência, a tela informa o nome civil do titular que poderá aparecer no banco.
6. O usuário faz a transferência diretamente ao titular.
7. A plataforma não condiciona agendamento, extensão, suporte ou prioridade à contribuição.

### Regras de produto

- Não solicitar PIX antes da conversa.
- Não usar mensagens de culpa, pressão ou urgência.
- Não sugerir que doar garante uma nova conversa.
- Não exibir ranking de doadores.
- Não enviar lembretes insistentes.
- Não chamar contribuição de pagamento, tarifa ou preço.
- Não prometer irrevogabilidade absoluta.
- Manter registro mínimo de conciliação e comprovantes necessários à contabilidade.
- Não coletar comprovante bancário do usuário se a conciliação puder ser feita sem isso.

### Ponto de atenção

Como o PIX será direto para uma pessoa física, o banco pode exibir o nome civil do titular. Se a intenção for preservar o nome civil, não se deve tentar ocultá-lo de forma enganosa; avaliar alternativa legítima com profissional contábil/jurídico.

## 9. Painel do anfitrião

- Calendário de disponibilidade.
- Lista de solicitações pendentes.
- Aceitar/recusar com um clique.
- Visão de sessões confirmadas.

## 10. Denúncia, abuso e segurança

Permitir denúncia de:

- Assédio ou ameaça.
- Conteúdo ilegal.
- Tentativa de obter contato ou dados pessoais de forma abusiva.
- Fraude ou falsidade de identidade.
- Suspeita de menor de idade.
- Uso da plataforma para simular atendimento profissional.
- Problemas técnicos ou violação de regras.

Ao denunciar:

- O participante escolhe categoria e pode acrescentar relato.
- Pode selecionar mensagens específicas para anexar à denúncia.
- O app explica que as mensagens selecionadas serão acessíveis à equipe responsável pela análise.
- O acesso ao material da denúncia é restrito e registrado.
- Definir prazo de retenção específico para denúncias.
- Permitir bloqueio preventivo e encerramento imediato quando necessário.

## 11. Emergências e limites

O produto não deve se anunciar como suporte de crise. A interface e os termos devem informar que:

- Não há monitoramento 24 horas.
- O anfitrião não é profissional de saúde.
- Não há garantia de resposta imediata.
- A plataforma não é canal de emergência.
- Em risco imediato no Brasil, procurar serviço público de emergência adequado (por exemplo, SAMU 192 ou Polícia 190). O CVV 188 é um serviço de apoio emocional, não substitui emergência médica.

Criar um procedimento interno realista para ameaça iminente, sem prometer intervenção, resgate ou acompanhamento que não possa ser prestado.

## 12. Modelo de dados inicial

**users**
- id
- email
- email_verified_at
- password_hash ou identificador do provedor de autenticação
- display_name
- adult_confirmed_at
- account_status
- created_at
- deleted_at

Evitar armazenar data de nascimento completa se um sinal de maioridade for suficiente.

**consent_records**
- id
- user_id
- document_type
- document_version
- accepted_at
- ip_or_security_metadata somente se justificado e com retenção definida

**availability_slots**
- id
- starts_at
- ends_at
- status

**bookings**
- id
- participant_id
- slot_id
- status
- requested_at
- decided_at
- decision_reason_code

**sessions**
- id
- booking_id
- started_at
- initial_ends_at
- actual_ended_at
- status
- extension_status

**extension_requests**
- id
- session_id
- requested_at
- decided_at
- decision
- new_ends_at
- conflict_check_result

**messages**
- id
- session_id
- sender_id
- body
- created_at
- deleted_at
- message_type

O acesso deve ser autorizado por vínculo à sessão. Avaliar criptografia em repouso e chaves; não alegar criptografia ponta a ponta sem implementação real.

**reports**
- id
- reporter_id
- session_id
- category
- description
- selected_message_ids
- status
- created_at
- closed_at

**donation_reconciliation**
- id
- received_at
- amount
- currency
- bank_reference
- purpose_label
- accounting_status

Guardar apenas dados necessários; não criar um cadastro de doadores se a conciliação não exigir.

**admin_audit_log**
- id
- admin_user_id
- action
- target_type
- target_id
- reason
- created_at

Não incluir conteúdo integral de mensagens em logs de auditoria.

## 13. Requisitos não funcionais

- Autorização no servidor em todas as operações.
- Proteção contra acesso horizontal a conversas de terceiros.
- Senhas com hash robusto e autenticação forte para o anfitrião.
- TLS em todas as conexões.
- Criptografia em repouso para banco e backups.
- Backups com retenção limitada e restauração testada.
- Rate limiting em login, agendamento, mensagens e denúncias.
- Proteção contra spam e enumeração de contas.
- Monitoramento sem conteúdo de conversa.
- Registro de acesso administrativo.
- Testes de concorrência para reserva e extensão.
- Política de incidentes e resposta.
- Acessibilidade e experiência mobile.
- Exportação e exclusão de dados.
- Separação entre ambiente de desenvolvimento, teste e produção.

## 14. Critérios de aceite do MVP

- Não é possível reservar duas sessões sobrepostas.
- Uma reserva só fica confirmada após aceite do anfitrião.
- Botão de extensão não aparece antes de 14 minutos.
- Participante só consegue pedir uma extensão por sessão.
- Extensão exige aceite explícito do anfitrião.
- Extensão é recusada quando conflita com outra reserva.
- Sessão termina no tempo previsto se não houver aprovação.
- Qualquer lado consegue encerrar antes do tempo.
- Histórico só pode ser consultado por participante autorizado e por acesso administrativo justificado.
- Áudio não é gravado por padrão.
- STT/TTS informam processamento externo quando aplicável.
- Doação não altera acesso, prioridade ou duração.
- Usuário pode solicitar exportação e exclusão.
- Denúncia restringe o acesso ao conteúdo selecionado.

---

# PARTE B — ESPECIFICAÇÃO JURÍDICA PRELIMINAR

## 15. Natureza jurídica e apresentação do serviço

### Posicionamento recomendado

Descrever o produto como "conversas informais de companhia, gratuitas e agendadas", evitando anunciar:

- terapia;
- tratamento;
- atendimento psicológico;
- aconselhamento clínico;
- suporte psiquiátrico;
- diagnóstico;
- cura, melhora ou prevenção de condições de saúde.

A declaração de que não é serviço de saúde ajuda a explicar o escopo, mas não prevalece sobre a atividade real. Se a operação passar a realizar avaliação, orientação clínica, intervenção terapêutica ou promessas de resultado, o risco jurídico muda.

### Texto-base para validação

> A plataforma oferece conversas informais de companhia, mediante agendamento e aceitação do anfitrião. Não oferece serviços médicos, psicológicos, psiquiátricos, psicoterapêuticos, terapêuticos ou de aconselhamento profissional. O anfitrião não realiza diagnósticos, tratamentos ou avaliações clínicas. A plataforma não é serviço de emergência e não garante disponibilidade contínua ou acompanhamento fora das sessões agendadas.

## 16. Gratuidade, aceitação e ausência de obrigação

### Texto-base

> O cadastro, a solicitação de horários e as conversas são gratuitos. Toda solicitação depende de disponibilidade e aceitação expressa do anfitrião. O envio de solicitação não cria obrigação de aceite. O participante pode cancelar ou deixar de comparecer, observadas as regras operacionais informadas. Qualquer participante pode encerrar a conversa a qualquer momento. A plataforma não garante disponibilidade futura, continuidade de contato ou vínculo pessoal.

### Cuidado jurídico

A operação deve corresponder ao que promete. Não anunciar acesso irrestrito se há seleção discricionária, nem prometer que toda pessoa terá atendimento. Explicar os critérios de segurança e disponibilidade de modo objetivo.

## 17. Doações recebidas por pessoa física via PIX

### Ponto central

A transferência voluntária pode ser juridicamente caracterizada como doação, mas a classificação tributária depende dos fatos, da documentação, da frequência, da finalidade e da legislação estadual aplicável. A palavra "doação" na interface não resolve sozinha a natureza fiscal.

### São Paulo — alerta específico

Se o responsável e/ou doadores estiverem domiciliados em São Paulo, avaliar o ITCMD estadual. A Secretaria da Fazenda de SP publicou em julho de 2026 orientação de consulta tributária sobre doações em dinheiro: menciona isenção para doações sucessivas entre o mesmo doador e donatário cuja soma no ano civil não ultrapasse 2.500 UFESPs, e ressalta que isenção de pagamento não deve ser confundida com dispensa de declaração. A aplicação ao fluxo de contribuições do app deve ser confirmada com contador(a), especialmente porque haverá múltiplos doadores, transferências recorrentes e finalidade de custeio da operação.

### Imposto de Renda

A Receita Federal trata doações em dinheiro recebidas por pessoa física como rendimentos isentos e não tributáveis para IRPF, observadas as regras de declaração aplicáveis; isso não afasta ITCMD estadual. A classificação como doação precisa ser verdadeira e comprovável. Se os valores forem entendidos como remuneração ou receita por atividade, o tratamento pode ser diferente.

### Recomendações operacionais

- Usar conta bancária de titularidade do responsável.
- Não misturar contribuições com pagamentos por sessão.
- Não prometer benefício em troca.
- Guardar extratos e conciliação.
- Registrar finalidade declarada e data/valor.
- Não emitir recibo de doação com afirmações fiscais sem orientação contábil.
- Confirmar com contador(a) se a atividade e o fluxo de valores exigem inscrição municipal, emissão de documento, declaração ou outro enquadramento.
- Avaliar se a operação recorrente em nome de pessoa física é adequada ou se uma pessoa jurídica simplificaria a separação patrimonial e contábil.

### Texto-base para a tela PIX

> Se desejar, você pode contribuir voluntariamente para ajudar a cobrir os custos de infraestrutura e manutenção da plataforma. A contribuição é opcional e não é pagamento pela conversa. Doar não garante prioridade, novo agendamento, extensão ou qualquer vantagem. A transferência será feita diretamente ao titular da conta indicada, cujo nome poderá ser exibido pelo seu banco. Antes de confirmar, confira o destinatário e o valor.

### Texto-base para política de contribuições

> As contribuições são espontâneas e facultativas. Não constituem condição de acesso à plataforma nem contraprestação por conversa, tempo, prioridade ou benefício. O responsável informa que pretende utilizar os valores para auxiliar nos custos de infraestrutura e manutenção. O tratamento de solicitações de estorno, transferências equivocadas ou suspeitas de fraude observará a legislação aplicável e as regras da instituição financeira. Nenhuma cláusula afasta direitos que não possam ser renunciados por lei.

Evitar a frase "toda doação é final e jamais reembolsável". O Código Civil prevê hipóteses de revogação da doação, entre outras questões jurídicas, e situações de fraude ou erro devem ser tratadas adequadamente.

## 18. LGPD — dados e bases legais

O responsável pela operação tende a atuar como controlador dos dados tratados para cadastro, agenda, mensagens, segurança e gestão do serviço. Fornecedores de hospedagem, autenticação, e-mail, áudio e STT/TTS podem atuar como operadores ou, conforme o caso concreto, controladores independentes.

### Categorias de dados

| Categoria | Exemplos | Tratamento sugerido |
|---|---|---|
| Cadastro | e-mail, apelido, senha/identificador | Necessário ao serviço |
| Maioridade | confirmação de 18+ | Minimizar; evitar documento se dispensável |
| Agenda | horários, cancelamentos, presença | Retenção definida |
| Conversa | texto enviado e recebido | Histórico do participante |
| Voz | fluxo de áudio ao vivo | Não gravar por padrão |
| STT/TTS | áudio para transcrição; texto para síntese | Processamento mediante ativação e transparência |
| Segurança | logs, denúncias, bloqueios | Acesso restrito e retenção específica |
| Doação | valor, data, referência bancária | Finalidade contábil e fiscal |

### Bases legais

Não escolher uma única base legal para tudo. Mapear cada finalidade:

- execução de procedimentos preliminares/contrato para cadastro, agendamento e funcionamento;
- cumprimento de obrigação legal ou regulatória para registros fiscais e outras retenções obrigatórias;
- exercício regular de direitos para preservação de evidências e defesa em processos, quando aplicável;
- legítimo interesse somente para dados pessoais não sensíveis, após teste de balanceamento e transparência;
- consentimento específico quando necessário, especialmente para recursos opcionais e usos que dependam dele.

**Dados sensíveis:** mensagens podem revelar saúde, religião, vida sexual, opinião política ou outros dados sensíveis. A LGPD tem hipóteses próprias no art. 11; legítimo interesse não é uma base geral para dados sensíveis. O projeto deve evitar solicitar ou classificar tais informações, não fazer inferência de saúde e submeter o desenho do histórico a advogado(a) de proteção de dados. Se a finalidade exigir tratamento de dados sensíveis, identificar hipótese legal adequada e informar de modo específico.

### Direitos do titular

Implementar canal e processo para:

- confirmação e acesso;
- correção;
- informação sobre compartilhamento;
- portabilidade, quando aplicável;
- anonimização, bloqueio ou eliminação quando cabível;
- revogação de consentimento;
- revisão de decisões automatizadas, se houver.

### Retenção proposta para discussão

- **Conta:** enquanto ativa; depois, excluir ou anonimizar, ressalvadas obrigações legais.
- **Histórico:** prazo definido e divulgado; permitir exclusão pelo usuário, com exceções legais e de segurança.
- **Denúncias:** prazo próprio, proporcional ao risco e a eventuais disputas.
- **Logs de segurança:** prazo documentado e mínimo necessário.
- **Dados fiscais/financeiros:** prazo definido por contador(a) conforme obrigação aplicável.
- **Backups:** ciclo limitado e informado; não prometer exclusão instantânea de cópias imutáveis.

**Prazo escolhido para o histórico de chat:** 30 dias após o encerramento da sessão. Denúncias e evidências selecionadas podem exigir retenção separada, limitada e justificada. Não publicar prazos genéricos para outras categorias antes de mapear as obrigações reais e configurar tecnicamente a exclusão.

## 19. Histórico e confidencialidade

A opção de histórico muda substancialmente o risco do produto.

### Política recomendada

- O participante vê o histórico das sessões em que participou.
- O histórico não é público.
- O anfitrião não consulta o histórico para acompanhar a vida do participante.
- Acesso técnico administrativo, se possível, deve ser excepcional, restrito, justificado e auditado.
- Mensagens escolhidas para denúncia podem ser acessadas pela pessoa responsável pela apuração.
- A política explica que a plataforma não oferece sigilo profissional equivalente ao de médico, psicólogo ou advogado.
- Não prometer confidencialidade absoluta.
- Não vender, anunciar ou usar mensagens para treinar IA.

Se o produto realmente quiser impedir que o operador leia o histórico, será necessário desenhar e testar criptografia ponta a ponta. Isso tem consequências para moderação, recuperação de conta, exportação e denúncias. Não afirmar E2EE sem auditoria técnica.

## 20. Marco Civil da Internet e registros

Avaliar a aplicação do Marco Civil da Internet ao serviço e ao tipo de provedor operado. O artigo 15 prevê guarda de registros de acesso a aplicações por seis meses para provedor de aplicações constituído como pessoa jurídica e que exerça a atividade de forma organizada, profissionalmente e com fins econômicos. O enquadramento de uma operação individual e gratuita não deve ser presumido; deve ser analisado por advogado(a).

Separar:

- registros de acesso à aplicação;
- registros de conexão, que normalmente são responsabilidade do provedor de conexão;
- conteúdo das mensagens;
- dados cadastrais;
- logs internos de segurança.

Não guardar conteúdo de mensagens "porque o Marco Civil exige": essa conclusão não decorre automaticamente da lei. O conteúdo tem regime próprio de privacidade e proteção.

## 21. CDC e responsabilidade civil

A gratuidade declarada é relevante, mas não permite concluir automaticamente que o Código de Defesa do Consumidor nunca se aplica. O CDC define serviço como atividade no mercado de consumo mediante remuneração; a existência de contribuições, publicidade, benefícios indiretos ou exploração econômica pode influenciar a análise. A incidência deve ser avaliada no modelo real.

Mesmo fora de uma relação de consumo, podem existir deveres civis de cuidado, boa-fé e reparação por ato ilícito. Termos de uso não eliminam responsabilidade por falhas próprias, tratamento irregular de dados, publicidade enganosa ou conduta ilícita.

### Evitar cláusulas como

- "O responsável nunca será responsável por qualquer dano."
- "O usuário renuncia a todos os direitos."
- "A plataforma não tem nenhuma obrigação em hipótese alguma."
- "Toda doação é irrevogável, independentemente da lei."

Preferir delimitar com precisão o escopo do serviço, ausência de aconselhamento profissional, disponibilidade limitada, regras de encerramento e procedimentos de segurança, sem tentar afastar direitos legais.

## 22. Saúde, psicologia e comunicação pública

A plataforma deve:

- Não usar "terapia", "consulta", "paciente", "tratamento" ou "diagnóstico".
- Não sugerir que conversas tratam depressão, ansiedade, trauma ou outras condições.
- Não oferecer planos de cuidado nem avaliação clínica.
- Não usar depoimentos que atribuam resultados terapêuticos ao serviço.
- Não orientar a interromper medicamentos ou tratamentos.
- Não criar bot que interprete sintomas ou classifique risco clínico.
- Em relatos de crise, comunicar limites e orientar procura de serviços adequados.

Uma frase de disclaimer não corrige uma prática que, na realidade, seja serviço profissional de saúde.

## 23. Termos de Uso — estrutura recomendada

1. Identificação do responsável e canal de contato.
2. Descrição do serviço.
3. Público maior de 18 anos.
4. Cadastro e segurança da conta.
5. Gratuidade e ausência de garantia de agendamento.
6. Aceitação ou recusa pelo anfitrião.
7. Duração de 15 minutos e extensão sujeita a pedido, aceite e disponibilidade.
8. Encerramento a qualquer momento.
9. Regras de conduta.
10. Proibição de assédio, ameaça, fraude e uso ilegal.
11. Natureza não profissional e não clínica.
12. Ausência de serviço de emergência e de monitoramento contínuo.
13. Histórico e regras de acesso.
14. Áudio, STT, TTS e fornecedores.
15. Doações opcionais via PIX.
16. Suspensão, bloqueio e encerramento de conta.
17. Limites de responsabilidade dentro do permitido por lei.
18. Alterações dos termos.
19. Lei aplicável e foro, conforme revisão jurídica.

## 24. Política de Privacidade — estrutura recomendada

1. Identificação e contato do controlador.
2. Quais dados são coletados.
3. Finalidades por categoria.
4. Bases legais por finalidade.
5. Histórico de conversas e acesso.
6. Processamento de áudio, STT e TTS.
7. Fornecedores e operadores.
8. Transferências internacionais.
9. Compartilhamento com autoridades nos casos legais.
10. Segurança e incidentes.
11. Prazos de retenção.
12. Direitos dos titulares.
13. Exclusão de conta e histórico.
14. Cookies e métricas.
15. Canal para solicitações LGPD.
16. Data e versão da política.

## 25. Checklist antes de abrir ao público

### Jurídico e tributário

- [ ] Advogado(a) revisou Termos de Uso.
- [ ] Advogado(a) revisou Política de Privacidade.
- [ ] Advogado(a) avaliou CDC e Marco Civil no modelo concreto.
- [ ] Advogado(a) avaliou o texto de não atendimento profissional.
- [ ] Contador(a) avaliou doações PIX recebidas por pessoa física.
- [ ] Contador(a) avaliou ITCMD no estado de domicílio aplicável.
- [ ] Contador(a) avaliou IRPF e documentação.
- [ ] Foi decidido se operar como pessoa física continua adequado.

### Privacidade e segurança

- [ ] Inventário de dados concluído.
- [ ] Bases legais documentadas.
- [ ] Prazos de retenção implementados.
- [ ] Exportação e exclusão testadas.
- [ ] Histórico protegido por autorização no servidor.
- [ ] Acesso administrativo auditado.
- [ ] Fornecedores STT/TTS/áudio avaliados.
- [ ] Transferências internacionais analisadas.
- [ ] Incidentes e denúncias têm procedimento.
- [ ] Backups e restauração testados.

### Produto

- [ ] Verificação de maioridade definida.
- [ ] Agendamento sem sobreposição testado.
- [ ] Temporizador de servidor testado.
- [ ] Extensão aos 14 minutos testada.
- [ ] Extensão bloqueada em caso de conflito.
- [ ] Chat histórico funciona com autorização.
- [ ] Áudio não é gravado por padrão.
- [ ] Doação não influencia o acesso.
- [ ] Nome civil exibido pelo PIX é informado previamente.
- [ ] Encerramento está sempre disponível.

---

# PARTE C — QUESTÕES QUE PRECISAM DE DECISÃO DO RESPONSÁVEL

1. **Histórico:** por quanto tempo o usuário poderá consultar suas conversas? Sugestão para discussão: 90 dias ou 1 ano, com opção de exclusão antes disso.
2. **Acesso do anfitrião:** você quer que não exista uma tela para ler conversas antigas, salvo mensagens enviadas voluntariamente em denúncia?
3. **Exclusão:** o usuário poderá apagar uma conversa individual ou somente todo o histórico?
4. **PIX:** aceita que o nome civil do titular da conta apareça para quem fizer a transferência?
5. **Horários:** qual antecedência mínima para reservar e qual intervalo entre sessões?
6. **Áudio:** pretende usar áudio diretamente entre navegadores ou contratar um fornecedor de mídia? A decisão afeta custo, IP e privacidade.
7. **Nome público:** deseja operar publicamente com seu nome civil ou usar uma marca, mantendo sua identificação legal nos documentos obrigatórios?

> **Atenção à atualização:** esta Parte C foi escrita antes de todas as decisões do projeto estarem fechadas. As respostas foram registradas na Parte D, abaixo, e prevalecem sobre as perguntas antigas.

### Referências oficiais para revisão

- LGPD — Lei nº 13.709/2018: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm
- Marco Civil da Internet — Lei nº 12.965/2014: https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2014/lei/l12965.htm
- Código Civil — Lei nº 10.406/2002: https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm
- Código de Defesa do Consumidor — Lei nº 8.078/1990: https://www.planalto.gov.br/ccivil_03/leis/l8078compilado.htm
- ANPD — Guia de segurança para agentes de tratamento de pequeno porte: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-sobre-seguranca-da-informacao-para-agentes-de-tratamento-de-pequeno-porte
- ANPD — Resolução CD/ANPD nº 2/2022 (agentes de pequeno porte): https://www.gov.br/anpd/pt-br/acesso-a-informacao/institucional/atos-normativos/regulamentacoes_anpd/resolucao-cd-anpd-no-2-de-27-de-janeiro-de-2022
- SEFAZ-SP — Resposta à Consulta Tributária 33.778/2026 (doação em dinheiro e ITCMD): https://legislacao.fazenda.sp.gov.br/Paginas/RC33778_2026.aspx
- Receita Federal — Doações e heranças: https://www.gov.br/receitafederal/pt-br/assuntos/meu-imposto-de-renda/preenchimento/manual-mir/rendimentos/outros-rendimentos

> **Observação tributária:** a consulta da SEFAZ-SP citada é orientação administrativa em caso concreto e não substitui análise do fluxo específico da plataforma. A regra aplicável depende do domicílio dos envolvidos, natureza real dos recebimentos, total anual por doador/donatário e legislação vigente.

---

# PARTE D — DECISÕES COMPLEMENTARES CONFIRMADAS

- **Histórico:** retenção por 30 dias após o encerramento da sessão.
- **Acesso do anfitrião:** somente mensagens selecionadas pelo participante e anexadas a uma denúncia; não haverá painel para leitura de históricos completos.
- **Exclusão:** participante pode apagar uma conversa individual ou todo o histórico.
- **PIX:** o responsável prefere não expor o nome civil. A implementação deve avaliar um intermediador/PSP legítimo que informe claramente quem é o recebedor e cumpra KYC e regras do arranjo PIX. Não é permitido prometer anonimato nem mascarar o titular real. Se não houver solução compatível, adiar PIX ou reavaliar o modelo operacional.
- **Antecedência mínima:** 12 horas. A validação deve ocorrer no servidor, usando o fuso configurado e horário confiável.
- **Identidade pública:** a marca do aplicativo será usada na experiência pública; a identificação legal do responsável/controlador deverá constar dos documentos, avisos e canais obrigatórios. Marca não substitui identificação legal.

## Regras de retenção e exclusão

1. Cada sessão encerrada inicia um prazo de retenção de 30 dias para o histórico normal.
2. Um processo automatizado elimina ou anonimiza mensagens expiradas nos bancos ativos.
3. Backups seguem um ciclo de expiração próprio, divulgado na política; não anunciar eliminação instantânea de todas as cópias se isso não for tecnicamente verdadeiro.
4. Ao apagar uma conversa individual, remover o conteúdo do histórico visível e agendar a eliminação nos sistemas ativos e backups conforme o ciclo definido.
5. Ao apagar todo o histórico, aplicar a mesma regra a todas as sessões do titular.
6. Mensagens selecionadas para denúncia são copiadas para um repositório de evidências separado, com acesso restrito, finalidade e prazo de retenção específicos. A exclusão do histórico não elimina automaticamente evidências que precisem ser preservadas, mas essa exceção deve ser explicada ao usuário.
7. Logs técnicos não devem conter o texto das mensagens.

## Antecedência mínima de reserva

- O servidor deve rejeitar qualquer solicitação cujo início seja inferior a 12 horas a partir do momento da solicitação.
- A interface deve mostrar horários elegíveis; a regra no servidor é definitiva.
- O cálculo deve usar timestamps UTC no banco e apresentar horários em America/Sao_Paulo no MVP.

## Nome público e PIX

A marca pode ser usada no domínio, interface e comunicações. O controlador deverá ser identificado de forma legalmente adequada na Política de Privacidade e nos Termos. Para PIX, a tela deve informar o nome do recebedor que será apresentado pelo banco/PSP. A privacidade do responsável não pode ser obtida por informação enganosa ou ocultação irregular da identidade do titular.
