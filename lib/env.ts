import dotenv from "dotenv";

import { validateEnv } from "./utils";

dotenv.config();

export const env = {
  PORT: validateEnv("PORT"),
  JWT_SECRET: validateEnv("JWT_SECRET"),
};
