"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { v4 as uuidv4 } from "uuid";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { pacienteSchema, TPaciente } from "@/lib/models";
import { maskCPF } from "@/lib/utils";
import { createPaciente } from "@/services/pacientes";

export function CriarPacienteForm({ className }: { className?: string }) {
  const form = useForm<TPaciente>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      id: uuidv4(),
      nome: "",
      sobrenome: "",
      cpf: "",
      email: "",
      cep: "",
      telefone: "",
      sexo: "",
    },
  });

  async function onSubmit(data: TPaciente) {
    toast.promise(createPaciente(data), {
      loading: "Cadastrando paciente...",
      success: "Cadastro feito com sucesso!",
      error: "Não foi possivel cadastrar o paciente.",
    });
    
    // form.reset();
  }

  return (
    <Card className={`w-full sm:max-w-md ${className}`}>
      <CardHeader>
        <CardTitle>Cadastrar</CardTitle>
        <CardDescription>Preecha para cadastrar um paciente.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Nome e Sobrenome */}
            <div className="flex flex-row gap-4">
              <Controller
                name="nome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">Nome</FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="sobrenome"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="form-rhf-demo-title">
                      Sobrenome
                    </FieldLabel>
                    <Input
                      {...field}
                      id="form-rhf-demo-title"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            {/* Email e CPF */}
            <div className="flex flex-row gap-4">
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email-input">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email-input"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="cpf"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cpf-input">CPF</FieldLabel>
                    <Input
                      {...field}
                      id="cpf-input"
                      aria-invalid={fieldState.invalid}
                      onChange={(e) => {
                        const maskedValue = maskCPF(e.target.value);
                        field.onChange(maskedValue);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <div className="flex flex-row gap-4">
              <Controller
                name="cep"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="cep-input">CEP</FieldLabel>
                    <Input
                      {...field}
                      id="cep-input"
                      aria-invalid={fieldState.invalid}
                      maxLength={9}
                      onChange={(e) => {
                        const cepFormatado = e.target.value.replace(
                          /(\d{5})(\d{3})/,
                          "$1-$2",
                        );
                        field.onChange(cepFormatado);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="telefone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="telefone-input">Telefone</FieldLabel>
                    <Input
                      {...field}
                      id="telefone-input"
                      aria-invalid={fieldState.invalid}
                      maxLength={11}
                      onChange={(e) => {
                        const telefoneFormatado = e.target.value
                          .replace(/\D/g, "")
                          .replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");

                        field.onChange(telefoneFormatado);
                      }}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Controller
                name="sexo"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="sexo-input">Sexo</FieldLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        id="sexo-input"
                        className="w-full max-w-48"
                      >
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sexo</SelectLabel>
                          <SelectItem value="f">Feminino</SelectItem>
                          <SelectItem value="m">Masculino</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="w-full" />
            </div>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row justify-end items-end">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>
          <Button type="submit" form="form-rhf-demo">
            Cadastrar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
