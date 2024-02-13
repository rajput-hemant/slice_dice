import { model, Schema } from "mongoose";

// Define the schema
const employeeSchema = new Schema({
  currency: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  on_contract: {
    type: Boolean,
  },
  salary: {
    type: Number,
    required: true,
  },
  sub_department: {
    type: String,
    required: true,
  },
});

// Create the model
export const Employee = model("Employee", employeeSchema);
