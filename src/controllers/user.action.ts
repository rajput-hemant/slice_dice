import { User } from "@/lib/database/models/user.model";
import { connectToDatabase } from "@/lib/database";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AppError } from "@/lib/utils/appError";
import { asyncHandler } from "@/lib/utils/asyncHandler";

export const CreateUser = asyncHandler(async (req, res) => {
  try {
    await connectToDatabase();
    // Create a new user
    const user = await User.findOne({}).where("email").equals(req.body.email);

    if (user) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    // Save the user to the database
    res
      .status(201)
      .json({ message: "User created successfully", data: newUser });
  } catch (error: any) {
    new AppError(error.message, 500);
  }
});

export const LoginUser = asyncHandler(async (req, res, next) => {
  try {
    await connectToDatabase();
    const { email, password } = req.body;
    const user = await User.findOne({}).where("email").equals(email);

    if (!user) {
      next(new AppError("User not found", 404));
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      next(new AppError("Incorrect email or password", 401));
      return;
    }

    // signin using jwt
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      httpOnly: true,
    });

    console.log("Login successful", token);

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error: any) {
    next(new AppError(error.message, 500));
  }
});
