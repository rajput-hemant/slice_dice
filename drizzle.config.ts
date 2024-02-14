import type { Config } from "drizzle-kit";

export default {
  schema: "lib/db/schema.ts",
  out: "drizzle",
  driver: "better-sqlite",
  dbCredentials: { url: "lib/db/sqlite.db" },
} satisfies Config;
