import { connectToDatabase } from "@/lib/database";
import { Employee } from "@/lib/database/models/employee.model";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";
import type { Request, Response } from "express";

export const addEmployee = asyncHandler(async (req: Request, res: Response) => {
  try {
    const data = req.body;
    await connectToDatabase();
    const result = await Employee.create(data);
    res
      .status(201)
      .json({ message: "Employee added successfully", data: result });
  } catch (error: any) {
    new AppError(error.message, 500);
  }
});
