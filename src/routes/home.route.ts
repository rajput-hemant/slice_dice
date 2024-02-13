import express from "express";
export const home = express.Router();
import { data } from "../../data";
import { connectToDatabase } from "@/lib/database";
import { Employee } from "@/lib/database/models/employee.model";

home.route("/").get(async (req, res) => {
  await connectToDatabase();
  await Employee.deleteMany({});
  const result = await Employee.insertMany(data);
  res.send(result);
});
