# Recuperação de senha

**RF** (Requisitos funcionais)

  [x] O usuário deve poder recuperar sua senha informando o seu email;
  [x] O usuário deve receber um email com instruções de recuperação de senha;
  [x] O usuário deve poder resetar sua senha;

**RNF** (Requisitos não funcionais)

  [x] Utilizar Mailtrap para testar envios em ambiente de dev;
  [ ] Utilizar Amazon SES para envios em produção;
  [ ] O envio de emails deve acontecer em segundo plano (background job);

**RN** (Regras de negócio)

  [x] O link enviado por email para resetar a senha deve expirar em 2h;
  [ ] O usuário precisa confirmar a nova senha ao resetar sua senha;

# Atualização do perfil

**RF** (Requisitos funcionais)

  - O usuário deve poder atualizar seu nome, email e senha;

**RN** (Regras de negócio)

  - O usuário não pode alterar seu email para um email já utilizado;
  - Para atualizar sua senha, o usuário deve informar a senha antiga;
  - Para atualizar sua senha, o usuário deve confirmar a nova senha;

# Painel do prestador

**RF** (Requisitos funcionais)

  - O usuário deve poder listar seua agendamentos de um dia específico;
  - O prestador deve receber uma notificação sempre que houver um novo agendamento;
  - O prestador deve poder visualizar as notificações não lidas;

**RNF** (Requisitos não funcionais)

  - Os agendamentos do prestador no dia devem ser armazenados em cache;
  - As notificações do prestador devem ser armazinadas no MongoDB;
  - As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io;

**RN** (Regras de negócio)

  - A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar;

# Agendamento de serviços

**RF** (Requisitos funcionais)

  [x] O usuário deve poder listar todos os prestadores de serviço cadastrados;
  [x] O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
  [x] O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
  [x] O usuário deve poder realizar um novo agendamento com um prestador;

**RNF** (Requisitos não funcionais)

  [ ] A listagem de prestadores deve ser armazenada em cache;

**RN** (Regras de negócio)

  [x] Cada agendamento deve durar 1hr exatamente;
  [ ] Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro às 8h, último as 17h);
  [x] O usuário não pode agendar em um horário já ocupado;
  [x] O usuário não pode agendar em um horário que já passou;
  [x] O usuário não pode agendar um horário consigo mesmo;
