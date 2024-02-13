import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("user", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name"),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  password: text("password").notNull(),
});

export const employees = sqliteTable("employee", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  currency: text("currency", { enum: ["INR", "USD", "EUR"] }).notNull(),
  salary: real("salary").notNull().default(0),
  department: text("department").notNull(),
  sub_department: text("sub_department").notNull(),
  on_contract: integer("on_contract", { mode: "boolean" })
    .notNull()
    .default(false),
});

/* -----------------------------------------------------------------------------------------------
 * types
 * -----------------------------------------------------------------------------------------------*/

export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export type NewEmployee = typeof employees.$inferInsert;
export type Employee = typeof employees.$inferSelect;
