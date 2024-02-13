import { addEmployee } from "@/controllers/employee.action";
import { connectToDatabase } from "@/lib/database";
import { Employee } from "@/lib/database/models/employee.model";
import express from "express";
export const employee = express.Router();

employee
  .route("/add")
  .get((req, res) => {
    res.json({
      message: "Add employee here",
      request: "POST",
      data: {
        currency: "string",
        department: "string",
        name: "string",
        "on_contract(optional)": "boolean",
        salary: "number",
        sub_department: "string",
      },
    });
  })
  .post(addEmployee);

employee.route("/delete/:id").get(async (req, res) => {
  const { id } = req.params;
  await connectToDatabase();
  const result = await Employee.findByIdAndDelete(id);
  res
    .status(200)
    .json({ message: "Employee deleted successfully", data: result });
});
