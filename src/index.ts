import express from "express";
import { home } from "./routes/home.route";
import { auth } from "./routes/auth.route";
import { employee } from "./routes/employee.route";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("", home);
app.use("/auth", auth);
app.use("/employee", employee);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
