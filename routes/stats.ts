import { Router } from "express";
import { and, avg, eq, max, min } from "drizzle-orm";

import { db } from "@/lib/db";
import { authMiddleware } from "@/middleware/auth-middleware";
import type { ServerResponse } from "@/types/server-response";
import { employees } from "@/lib/db/schema";
import { statsSchema } from "@/validations/stats";

export const stats = Router();

/* -----------------------------------------------------------------------------------------------
 * GET /stats - Get employee stats
 * -----------------------------------------------------------------------------------------------*/

stats.get("/", authMiddleware, async (req, res) => {
  const result = statsSchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Query",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const { salary, currency, department, on_contract, sub_department } =
    result.data;

  const stats = await db
    .select({
      min: min(employees.salary),
      max: max(employees.salary),
      avg: avg(employees.salary),
    })
    .from(employees)
    .where(
      and(
        // @ts-ignore
        salary ? between(employees.salary, ...salary.split("-")) : undefined,
        currency ? eq(employees.currency, currency) : undefined,
        department ? eq(employees.department, department) : undefined,
        on_contract ? eq(employees.on_contract, on_contract) : undefined,
        sub_department
          ? eq(employees.sub_department, sub_department)
          : undefined,
      ),
    );

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee stats",
    data: stats,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * GET /stats/department - Get employee stats by department
 * -----------------------------------------------------------------------------------------------*/

stats.get("/department", authMiddleware, async (_req, res) => {
  const stats = await db
    .select({
      department: employees.department,
      min: min(employees.salary),
      max: max(employees.salary),
      avg: avg(employees.salary),
    })
    .from(employees)
    .groupBy(employees.department);

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee stats by department",
    data: stats,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * GET /stats/sub-department - Get employee stats by sub-department
 * -----------------------------------------------------------------------------------------------*/

stats.get("/sub-department", authMiddleware, async (_req, res) => {
  const stats = await db
    .select({
      sub_department: employees.sub_department,
      min: min(employees.salary),
      max: max(employees.salary),
      avg: avg(employees.salary),
    })
    .from(employees)
    .groupBy(employees.sub_department);

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee stats by sub-department",
    data: stats,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * GET /stats/currency - Get employee stats by currency
 * -----------------------------------------------------------------------------------------------*/

stats.get("/currency", authMiddleware, async (_req, res) => {
  const stats = await db
    .select({
      currency: employees.currency,
      min: min(employees.salary),
      max: max(employees.salary),
      avg: avg(employees.salary),
    })
    .from(employees)
    .groupBy(employees.currency);

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee stats by currency",
    data: stats,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * GET /stats/on-contract - Get employee stats by contract type
 * -----------------------------------------------------------------------------------------------*/

stats.get("/on-contract", authMiddleware, async (_req, res) => {
  const stats = await db
    .select({
      on_contract: employees.on_contract,
      min: min(employees.salary),
      max: max(employees.salary),
      avg: avg(employees.salary),
    })
    .from(employees)
    .groupBy(employees.on_contract);
  // .having(({ on_contract }) => eq(on_contract, true));

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee stats by contract type",
    data: stats,
  } satisfies ServerResponse);
});
