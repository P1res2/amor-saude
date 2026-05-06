import { Argon2id } from "oslo/password";

export async function registerUser(
  email: string,
  password_plain: string,
): Promise<string> {
  const argon2id = new Argon2id();
  const passwordHash = await argon2id.hash(password_plain);
  // Salve passwordHash no seu banco de dados junto com o email do usuário
  console.log("Senha hasheada:", passwordHash);
  return passwordHash;
}
