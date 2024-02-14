import { z } from "zod";

export const employeeSchema = z.object({
  id: z
    .string()
    .min(1, "ID should be at least 1")
    .pipe(z.coerce.number())
    .optional(),
  name: z.string().min(3, "Name should be at least 3 characters").optional(),
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

export const newEmployeeSchema = z.object({
  name: z
    .string({
      required_error: "Name is required",
      invalid_type_error: "Name should be a string",
    })
    .min(3, "Name should be at least 3 characters"),
  currency: z.enum(["INR", "USD", "EUR"], {
    required_error: "Currency is required",
    invalid_type_error: "Currency should be a string",
  }),
  salary: z
    .number({ invalid_type_error: "Salary should be a number" })
    .default(0),
  department: z
    .string({
      required_error: "Department is required",
      invalid_type_error: "Department should be a string",
    })
    .min(3, "Department should be at least 3 characters"),
  sub_department: z
    .string({
      required_error: "Sub department is required",
      invalid_type_error: "Sub department should be a string",
    })
    .min(3, "Sub department should be at least 3 characters"),
  on_contract: z.boolean().default(false),
});

export const deleteEmployeeSchema = z.object({
  id: z.coerce.number().min(1, "ID should be at least 1"),
});
