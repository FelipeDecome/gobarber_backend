# Recuperação de senha

**RF** (Requisitos funcionais)

- [x] O usuário deve poder recuperar sua senha informando o seu email;
- [x] O usuário deve receber um email com instruções de recuperação de senha;
- [x] O usuário deve poder resetar sua senha;

**RNF** (Requisitos não funcionais)

- [x] Utilizar Mailtrap para testar envios em ambiente de dev;
- [ ] Utilizar Amazon SES para envios em produção;
- [ ] O envio de emails deve acontecer em segundo plano (background job);

**RN** (Regras de negócio)

- [x] O link enviado por email para resetar a senha deve expirar em 2h;
- [x] O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF** (Requisitos funcionais)

- [x] O usuário deve poder atualizar seu nome, email e senha;

**RN** (Regras de negócio)

- [x] O usuário não pode alterar seu email para um email já utilizado;
- [x] Para atualizar sua senha, o usuário deve informar a senha antiga;
- [x] Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF** (Requisitos funcionais)

- [x] O usuário deve poder listar seus agendamentos de um dia específico;
- [ ] O prestador deve receber uma notificação sempre que houver um novo agendamento;
- [ ] O prestador deve poder visualizar as notificações não lidas;

**RNF** (Requisitos não funcionais)

- [x] Os agendamentos do prestador no dia devem ser armazenados em cache;
- [x] As notificações do prestador devem ser armazinadas no MongoDB;
- [ ] As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN** (Regras de negócio)

- [x] A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF** (Requisitos funcionais)

- [x] O usuário deve poder listar todos os prestadores de serviço cadastrados;
- [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- [x] O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- [x] O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** (Requisitos não funcionais)

- [x] A listagem de prestadores deve ser armazenada em cache;

**RN** (Regras de negócio)

- [x] Cada agendamento deve durar 1hr exatamente;
- [x] Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último as 17h);
- [x] O usuário não pode agendar em um horário já ocupado;
- [x] O usuário não pode agendar em um horário que já passou;
- [x] O usuário não pode agendar um horário consigo mesmo;

# Sessões de usuários

**RF**

- [ ] Usuários devem ser capazes de se autenticar;
- [ ] Usuários devem ser capazes de gerar um novo token se o anterior expirar;

**RN**

- [ ] O usuário deve receber um token JWT e um token para gerar outro token JWT quando o mesmo expirar;
- [ ] Um novo refresh token deve ser gerado no momento que um novo JWT token for gerado e o antigo deve ser inválidado;
- [ ] O token JWT deve expirar a cada 8 horas;
- [ ] O refresh token deve expirar a cada 16 horas;

# Criação de usuário

- [ ] Usuários devem receber um email de confirmação;
