import { Router } from "express";

import type { ServerResponse } from "@/types/server-response";

export const home = Router();

home.get("/", (_req, res) => {
  res.json({
    status: "SUCCESS",
    message: "Welcome to Slice Dice API!",
    data: null,
  } satisfies ServerResponse);
});
