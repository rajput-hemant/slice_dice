import { z } from "zod";

export const statsSchema = z.object({
  currency: z
    .enum(["INR", "USD", "EUR"], {
      invalid_type_error: "Currency should be a string",
    })
    .optional(),
  salary: z
    .string()
    .regex(/^(\d+)-(\d+)$/, "Salary range should be in format `min-max`")
    .default(`0-${Number.MAX_SAFE_INTEGER}`)
    .optional(),
  department: z
    .string()
    .min(3, "Department should be at least 3 characters")
    .optional(),
  sub_department: z
    .string()
    .min(3, "Sub department should be at least 3 characters")
    .optional(),
  on_contract: z.coerce.boolean().optional(),
});
