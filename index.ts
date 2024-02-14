import express from "express";
import cookieParser from "cookie-parser";

import { env } from "./lib/env";
import { auth, employee, home, ping } from "./routes";
// import { refreshSessionMiddleware } from "./middleware/refresh-session";

const app = express();

/* -----------------------------------------------------------------------------------------------
 * middlewares
 * -----------------------------------------------------------------------------------------------*/

app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());

// custom middlewares

// app.use(refreshSessionMiddleware);

/* -----------------------------------------------------------------------------------------------
 * routes
 * -----------------------------------------------------------------------------------------------*/

app.use("/", home);
app.use("/auth", auth);
app.use("/employee", employee);
app.use("/ping", ping);

app.listen(env.PORT, () => {
  console.log("🚀 Server is running on e:", env.PORT);
});
