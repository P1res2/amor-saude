"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { loginSchema, TLoginFormValues } from "../validations";
import { login } from "../actions";
import { Spinner } from "@/components/ui/spinner";
import { useUserStore } from "@/app/store/userStore";
import { TUsuario } from "@/lib/models";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const setUser = useUserStore((state) => state.setUser);
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const form = useForm<TLoginFormValues>({
    resolver: zodResolver(loginSchema),
    disabled: loading,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TLoginFormValues) => {
    setLoading(true);

    toast.promise(
      (async () => {
        const result = await login(data);

        if (result.error) {
          setLoading(false);
          throw new Error(result.error);
        }

        // 1. Grava no estado
        const dadosUsuario: TUsuario = {
          id: result.id!,
          email: result.email!,
          nome: result.nome!,
          sobrenome: result.sobrenome!,
          role: result.role,
          cpf: result.cpf!,
        };

        setUser(dadosUsuario);

        // 2. Redirecionamento Direto (Evite a página /redirect)
        // Use o dado que veio da API (result) em vez de ler da store agora,
        // pois a store pode levar alguns milissegundos para refletir.
        if (result.role === "admin") {
          router.replace("/admin/pacientes");
        } else {
          router.replace("/paciente/consultas");
        }

        return result;
      })(),
      {
        loading: "Fazendo login...",
        success: "Bem-vindo!",
        error: (err) => err.message,
      },
    );
  };

  return (
    <Card className={cn("w-full sm:max-w-md", className)} {...props}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Entrar</CardTitle>
        <CardDescription>Preencha para entrar no sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="login-email"
                    type="email"
                    placeholder="seu@email.com"
                    aria-invalid={fieldState.invalid}
                    autoComplete="email"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                  <Input
                    {...field}
                    id="login-password"
                    type="password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Field>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? <Spinner /> : "Entrar"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
