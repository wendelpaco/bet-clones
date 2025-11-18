import { z } from "zod";

export const statusEnum = z.enum(["ok", "warning", "critical"], {
  errorMap: () => ({ message: "Status inválido" }),
});

export const houseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  url: z.string().url("URL inválida"),
  status: statusEnum.default("ok"),
  notes: z.string().max(500, "Notas muito longas").optional(),
});

export const cloneSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  url: z.string().url("URL inválida"),
  status: statusEnum.default("ok"),
  notes: z.string().max(500, "Notas muito longas").optional(),
});

// Schema para atualização de clone (permite mudar de grupo)
export const cloneUpdateSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  url: z.string().url("URL inválida"),
  status: statusEnum.default("ok"),
  notes: z.string().max(500, "Notas muito longas").optional(),
  houseId: z.string().uuid("ID da casa inválido").optional(),
});

export const noCloneHouseSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório").max(100, "Nome muito longo"),
  url: z.string().url("URL inválida"),
});

export type HouseInput = z.infer<typeof houseSchema>;
export type CloneInput = z.infer<typeof cloneSchema>;
export type CloneUpdateInput = z.infer<typeof cloneUpdateSchema>;
export type NoCloneHouseInput = z.infer<typeof noCloneHouseSchema>;
export type Status = z.infer<typeof statusEnum>;

// Utilitário para obter label e cor do status
export const statusConfig = {
  ok: {
    label: "Sem Problemas",
    color: "success" as const,
    description: "Funcionando normalmente",
  },
  warning: {
    label: "Relatos de Problemas",
    color: "warning" as const,
    description: "Alguns problemas reportados",
  },
  critical: {
    label: "Problemas com Saques",
    color: "destructive" as const,
    description: "Problemas graves, especialmente saques",
  },
};
