import type { NextFunction, Request, Response } from "express";
import { jwtVerify } from "jose";

import { env } from "@/lib/utils";

export async function refreshSessionMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const session = req.cookies.session;

  if (!session) {
    return;
  }

  const key = new TextEncoder().encode(env("JWT_SECRET"));

  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });

    const expires = new Date(Date.now() + 10 * 1000);

    payload.expires = expires;

    res.cookie("session", payload, {
      httpOnly: true,
      secure: true,
      expires: expires,
    });

    next();
  } catch (error) {
    return;
  }
}
