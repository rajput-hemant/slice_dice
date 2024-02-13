import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

import { env } from "@/lib/env";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = req.cookies.session;

  if (!session) {
    res.status(401).json({
      status: "ERROR",
      message: "❌ Session not found",
      error: "invalid_session",
    });

    return;
  }

  const key = new TextEncoder().encode(env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    req.user = payload as Request["user"];

    next();
  } catch (error) {
    console.error(error);

    res.status(401).json({
      status: "ERROR",
      message: "❌ Invalid session",
      error: "invalid_session",
    });
  }
}
