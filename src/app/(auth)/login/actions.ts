"use server";

import { Argon2id } from "oslo/password";
import { setSessionCookie } from "@/lib/cookies";
import { api } from "@/services/api";
import { TLoginFormValues, TLoginResponse } from "./validations";

export async function login(data: TLoginFormValues) {
  const { email, password } = data;

  // validação de entrada Server-side
  if (!email || !password) {
    // Em um cenário real, você retornaria um erro mais específico ou usaria um sistema de validação
    console.error("Email e senha são obrigatórios.");
    return { error: "Email e senha são obrigatórios." };
  }

  try {
    // busca de usuário no banco de dados
    const pacientesResponse = await api<TLoginResponse[]>(
      `/pacientes?email=${email}`,
    );
    const usuariosResponse = await api<TLoginResponse[]>(
      `/usuarios?email=${email}`,
    );

    const pacienteUser = pacientesResponse.data[0];
    const user = usuariosResponse.data[0];

    if (!pacienteUser) {
      if (!user) {
        console.error("Usuário não encontrado.");
        return { error: "Usuário não encontrado." };
      }
    }

    // Inicializa o Argon2id
    const argon2id = new Argon2id();

    if (pacienteUser) {
      const isPasswordMatch = pacienteUser.cpf.replace(/\D/g, "") === password;

      // Comparar a senha fornecida com o hash armazenado
      if (!isPasswordMatch) {
        console.error("Senha incorreta.");
        return { error: "Credenciais inválidas" };
      }

      // criação de token de sessão e definição de cookie
      await setSessionCookie(pacienteUser.sessionToken);
      return {
        success: `Seja bem vindo! ${pacienteUser.nome}. Aqui estão as suas consultas`,
        id: pacienteUser.id,
        role: pacienteUser.role,
        email: pacienteUser.email,
        nome: pacienteUser.nome,
        sobrenome: pacienteUser.sobrenome,
        cpf: pacienteUser.cpf
      };
    }

    if (user) {
      // Comparar a senha fornecida com o hash armazenado
      const passwordMatch = await argon2id.verify(user.passwordHash, password);

      if (!passwordMatch) {
        console.error("Senha incorreta.");
        return { error: "Credenciais inválidas" };
      }

      // criação de token de sessão e definição de cookie
      await setSessionCookie(user.sessionToken);
      return {
        success: `Seja bem vindo! ${user.nome}`,
        id: user.id,
        role: user.role,
        email: user.email,
        nome: user.nome,
        sobrenome: user.sobrenome,
        cpf: user.cpf
      };
    }
    return { error: "Erro interno da aplicação" };
  } catch (error) {
    console.error("Erro durante o login:", error);
    return { error: "Erro interno do servidor" };
  }
}
