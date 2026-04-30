import { TPaciente } from "./features/paciente/validations";

export const pacientesIniciais: TPaciente[] = [
  {
    id: "1a2b3c",
    nome: "João",
    sobrenome: "Nogueira",
    email: "joao.nogueira@email.com",
    cpf: "12345678909",
    cep: "01310930",
  },
  {
    id: "4d5e6f",
    nome: "Maria",
    sobrenome: "Silva e Souza",
    email: "maria.souza@email.com.br",
    cpf: "98765432100",
    cep: "20040002",
  },
  {
    id: "7g8h9i",
    nome: "Carlos",
    sobrenome: "Eduardo de Almeida",
    email: "cadu.almeida@techmail.com",
    cpf: "45612378944",
    cep: "30130005",
  },
  {
    id: "0j1k2l",
    nome: "Ana",
    sobrenome: "Beatriz Gusmão",
    email: "anab.gusmao@corp.com",
    cpf: "32165498777",
    cep: "40020000",
  },
  {
    id: "3m4n5o",
    nome: "Felipe",
    sobrenome: "Ret",
    email: "felipe.ret@vivaz.com",
    cpf: "15975345688",
    cep: "80020000",
  },
];

// Garante que o mock persista entre hot-reloads no Next.js
const globalForDb = global as unknown as { pacientesMock: TPaciente[] };

export const pacientesMock = globalForDb.pacientesMock || pacientesIniciais;

if (process.env.NODE_ENV !== "production") globalForDb.pacientesMock = pacientesMock;
