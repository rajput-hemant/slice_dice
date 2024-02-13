import { connectToDatabase } from "@/lib/database";
import { data } from "../../data";
import { Employee } from "@/lib/database/models/employee.model";
import { AppError } from "@/lib/utils/appError";
export const uploadData = async () => {
  // Connect to the database
  try {
    await connectToDatabase();
    await Employee.deleteMany({});
    const res = await Employee.insertMany(data);
    console.log("Data uploaded successfully", res);

    return res;
  } catch (error) {
    new AppError("Failed to upload data", 500);
  }
  // Create a new user
};
