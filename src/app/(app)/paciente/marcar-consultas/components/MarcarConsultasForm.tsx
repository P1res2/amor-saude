"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, Resolver, useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { consultaSchema, TConsulta } from "@/lib/models";
import { createConsulta } from "@/services/consultas";
import { addDays } from "date-fns";

interface CriarConsultaFormProps {
  pacienteId: string;
  className?: string;
}

export function CriarConsultaForm({
  pacienteId,
  className,
}: CriarConsultaFormProps) {
  const form = useForm<TConsulta>({
    resolver: zodResolver(consultaSchema) as Resolver<TConsulta>,
    defaultValues: {
      id: uuidv4(),
      pacienteId,
      data: addDays(new Date(), 5),
      observacoes: null,
      status: "agendada",
      EspecialidadeMedico: "clinico_geral",
      UsuarioId: pacienteId,
    },
  });

  async function onSubmit(data: TConsulta) {
    console.log("dados do form:", data);
    toast.promise(createConsulta(data), {
      loading: "Marcando consulta...",
      success: "Consulta marcada com sucesso!",
      error: "Não foi possível marcar a consulta.",
    });

    form.reset();
  }

  return (
    <Card className={`w-full sm:max-w-md ${className}`}>
      <CardHeader>
        <CardTitle>Nova Consulta</CardTitle>
        <CardDescription>Preencha para agendar uma consulta.</CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-consulta" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Data */}
            <Controller
              name="data"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="data-input">Data e Hora</FieldLabel>
                  <Input
                    id="data-input"
                    type="datetime-local"
                    aria-invalid={fieldState.invalid}
                    value={
                      field.value instanceof Date
                        ? field.value.toISOString().slice(0, 16)
                        : ""
                    }
                    onChange={(e) => field.onChange(new Date(e.target.value))}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Especialidade */}
            <Controller
              name="EspecialidadeMedico"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="especialidade-input">
                    Especialidade
                  </FieldLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger id="especialidade-input" className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Especialidade</SelectLabel>
                        <SelectItem value="clinico_geral">
                          Clínico Geral
                        </SelectItem>
                        <SelectItem value="cardiologista">
                          Cardiologista
                        </SelectItem>
                        <SelectItem value="dermatologista">
                          Dermatologista
                        </SelectItem>
                        <SelectItem value="endocrinologista">
                          Endocrinologista
                        </SelectItem>
                        <SelectItem value="gastroenterologista">
                          Gastroenterologista
                        </SelectItem>
                        <SelectItem value="ginecologista">
                          Ginecologista
                        </SelectItem>
                        <SelectItem value="neurologista">
                          Neurologista
                        </SelectItem>
                        <SelectItem value="oftalmologista">
                          Oftalmologista
                        </SelectItem>
                        <SelectItem value="ortopedista">Ortopedista</SelectItem>
                        <SelectItem value="otorrinolaringologista">
                          Otorrinolaringologista
                        </SelectItem>
                        <SelectItem value="pediatra">Pediatra</SelectItem>
                        <SelectItem value="psiquiatra">Psiquiatra</SelectItem>
                        <SelectItem value="urologista">Urologista</SelectItem>
                        <SelectItem value="reumatologista">
                          Reumatologista
                        </SelectItem>
                        <SelectItem value="oncologista">Oncologista</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Observações */}
            <Controller
              name="observacoes"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="observacoes-input">
                    Sintomas/Observações
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="observacoes-input"
                    value={field.value ?? ""}
                    aria-invalid={fieldState.invalid}
                    placeholder="Opcional..."
                    rows={4}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-row justify-end items-end">
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Limpar
          </Button>
          <Button type="submit" form="form-consulta">
            Agendar
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
