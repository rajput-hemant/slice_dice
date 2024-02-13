import { z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .regex(/^(?!\s*$).+/, "Password must not contain Whitespaces.")
    .regex(
      /^(?=.*[A-Z])/,
      "Password must contain at least one uppercase letter.",
    )
    .regex(
      /^(?=.*[a-z])/,
      "Password must contain at least one lowercase letter.",
    )
    .regex(/^(?=.*\d)/, "Password must contain at least one number.")
    .regex(
      /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
      "Password must contain at least one special character.",
    )
    .min(8, "Password must be at least 8 characters long."),
});

export const resetPasswordSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    newPassword: z
      .string()
      .regex(/^(?!\s*$).+/, "Password must not contain Whitespaces.")
      .regex(
        /^(?=.*[A-Z])/,
        "Password must contain at least one uppercase letter.",
      )
      .regex(
        /^(?=.*[a-z])/,
        "Password must contain at least one lowercase letter.",
      )
      .regex(/^(?=.*\d)/, "Password must contain at least one number.")
      .regex(
        /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹])/,
        "Password must contain at least one special character.",
      )
      .min(8, "Password must be at least 8 characters long."),
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password must not be same as old password.",
    path: ["newPassword"],
  });
