import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

import * as schema from "./schema";

/* -----------------------------------------------------------------------------------------------
 * In Memory Database
 * -----------------------------------------------------------------------------------------------*/

// const sqlite = new Database(":memory:", { verbose: console.log });

/* -----------------------------------------------------------------------------------------------
 * File Database
 * -----------------------------------------------------------------------------------------------*/

const sqlite = new Database("lib/db/sqlite.db", { verbose: console.log });

export const db = drizzle(sqlite, { schema });

migrate(db, { migrationsFolder: "drizzle" });
