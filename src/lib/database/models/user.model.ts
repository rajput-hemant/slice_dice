import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

// Define the user schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Create and export the Mongoose model
export const User = model("User", UserSchema);

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Define the types for new user and user
export type NewUser = {
  id: string;
  name: string;
  email: string;
  password: string;
};
export type User = NewUser;
