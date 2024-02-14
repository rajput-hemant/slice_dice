import { Router } from "express";
import { eq } from "drizzle-orm";

import type { ServerResponse } from "@/types/server-response";
import {
  deleteEmployeeSchema,
  employeeSchema,
  newEmployeeSchema,
} from "@/validations/employee";
import { db } from "@/lib/db";
import { employees } from "@/lib/db/schema";
import { authMiddleware } from "@/middleware/auth-middleware";

export const employee = Router();

/* -----------------------------------------------------------------------------------------------
 * GET /employee?id - Get employee(s) by id
 * -----------------------------------------------------------------------------------------------*/

employee.get("/", authMiddleware, async (req, res) => {
  const result = employeeSchema.safeParse(req.query);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Query",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const {
    id,
    name,
    salary,
    currency,
    department,
    on_contract,
    sub_department,
  } = result.data;

  const employee = await db.query.employees.findMany({
    where: (e, { eq, and, between }) =>
      and(
        id ? eq(e.id, id) : undefined,
        name ? eq(e.name, name) : undefined,
        // @ts-ignore
        salary ? between(e.salary, ...salary.split("-")) : undefined,
        currency ? eq(e.currency, currency) : undefined,
        department ? eq(e.department, department) : undefined,
        on_contract ? eq(e.on_contract, on_contract) : undefined,
        sub_department ? eq(e.sub_department, sub_department) : undefined,
      ),
  });

  if (!employee) {
    res.status(404).json({
      status: "ERROR",
      message: "❌ Employee not found",
      error: "employee_not_found",
    } satisfies ServerResponse);

    return;
  }

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee found",
    data: employee,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * POST /employee/(add|create) - Create a new employee
 * -----------------------------------------------------------------------------------------------*/

employee.post(["/add", "/create"], authMiddleware, async (req, res) => {
  const result = newEmployeeSchema.safeParse(req.body);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Body",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const employee = await db.query.employees.findFirst({
    where: (e, { eq }) => eq(e.name, result.data.name),
  });

  if (employee) {
    res.status(409).json({
      status: "ERROR",
      message: "❌ Employee already exists",
      error: "employee_exists",
    } satisfies ServerResponse);

    return;
  }

  const [newEmployee] = await db
    .insert(employees)
    .values(result.data)
    .returning();

  res.status(201).json({
    status: "SUCCESS",
    message: "✅ Employee created successfully",
    data: newEmployee,
  } satisfies ServerResponse);
});

/* -----------------------------------------------------------------------------------------------
 * GET /employee/delete/:id - Delete an employee by id
 * -----------------------------------------------------------------------------------------------*/

employee.get("/delete/:id", authMiddleware, async (req, res) => {
  const result = deleteEmployeeSchema.safeParse(req.params);

  if (!result.success) {
    res.status(400).json({
      status: "ERROR",
      message: "❌ Invalid Request Params",
      error: result.error.issues.map((i) => `${i.path}: ${i.message}`),
    } satisfies ServerResponse);

    return;
  }

  const { id } = result.data;

  const [deletedEmployee] = await db
    .delete(employees)
    .where(eq(employees.id, id))
    .returning();

  if (!deletedEmployee) {
    res.status(404).json({
      status: "ERROR",
      message: "❌ Employee not found",
      error: "employee_not_found",
    } satisfies ServerResponse);

    return;
  }

  res.status(200).json({
    status: "SUCCESS",
    message: "✅ Employee deleted successfully",
    data: deletedEmployee,
  } satisfies ServerResponse);
});
