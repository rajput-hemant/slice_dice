import { SignJWT } from "jose";
import { eq } from "drizzle-orm";
import { Router } from "express";
import { randomUUID } from "crypto";
import { compare, hash } from "bcrypt";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import type { ServerResponse } from "@/types/server-response";
import { authSchema, resetPasswordSchema } from "@/validations/auth";
import { env } from "@/lib/env";

export const auth = Router();

/* -----------------------------------------------------------------------------------------------
 * Register/Signup Route
 * -----------------------------------------------------------------------------------------------*/

auth.post(["/register", "/signup"], async (req, res) => {
  const result = authSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Body",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const { email, password } = result.data;

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (user) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Email already exists",
      error: "email_already_exists",
    } satisfies ServerResponse);

    return;
  }

  const hashedPassword = await hash(password, 10);
  const username = randomUUID();

  await db.insert(users).values({ username, email, password: hashedPassword });

  res.json({
    status: "SUCCESS",
    message: "✅ You have successfully registered",
    data: null,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * Login/Signin Route
 * -----------------------------------------------------------------------------------------------*/

auth.post(["/login", "/signin"], async (req, res) => {
  const result = authSchema.safeParse(req.body);

  if (result.success === false) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Body",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const { email, password } = result.data;

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user) {
    res.status(400).json({
      status: "ERROR",
      message:
        "❌ User not found, the email is not registered or the role is incorrect",
      error: "user_not_found",
    } satisfies ServerResponse);
    return;
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid password",
      error: "invalid_password",
    } satisfies ServerResponse);
    return;
  }

  const key = new TextEncoder().encode(env.JWT_SECRET);
  const expires = new Date(Date.now() + 15 * 24 * 60 * 60 * 1000); // 15 days

  const payload = { id: user.id, email: user.email, expires };

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("15d")
    .sign(key);

  res.cookie("session", session, { httpOnly: true, expires });

  res.json({
    status: "SUCCESS",
    message: "✅ You have successfully logged in",
    data: { session },
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * Logout/Signout Route
 * -----------------------------------------------------------------------------------------------*/

auth.get(["/logout", "/signout"], async (_req, res) => {
  res.clearCookie("session", { expires: new Date(Date.now() - 1000) });

  res.json({
    status: "SUCCESS",
    message: "✅ You have successfully logged out",
    data: null,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * Reset Password Route
 * -----------------------------------------------------------------------------------------------*/

auth.post("/reset-password", async (req, res) => {
  const result = resetPasswordSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Body",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const { email, password, newPassword } = result.data;

  const user = await db.query.users.findFirst({
    where: (u, { eq }) => eq(u.email, email),
  });

  if (!user) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ User not found, the email is not registered",
      error: "user_not_found",
    } satisfies ServerResponse);

    return;
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid password",
      error: "invalid_password",
    } satisfies ServerResponse);

    return;
  }

  const hashedPassword = await hash(newPassword, 10);

  await db
    .update(users)
    .set({ password: hashedPassword })
    .where(eq(users.id, user.id));

  res.json({
    status: "SUCCESS",
    message: "✅ You have successfully reset your password",
    data: null,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * Forgot Password Route
 * -----------------------------------------------------------------------------------------------*/

// TODO: Implement forgot password route
