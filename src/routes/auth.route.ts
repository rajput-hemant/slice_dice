import { CreateUser, LoginUser } from "@/controllers/user.action";
import express from "express";
export const auth = express.Router();

auth
  .route(["/signup", "/register"])
  .get((req, res) => {
    res.send("Register or sign up here! REQUEST : POST");
  })
  .post(CreateUser);

auth
  .route(["/signin", "/login"])
  .get((req, res) => {
    res.send("Login or sign in here! REQUEST : POST");
  })
  .post(LoginUser);
