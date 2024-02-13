import express from "express";
import cookieParser from "cookie-parser";

import { auth, home, ping } from "./routes";
import { refreshSessionMiddleware } from "./middleware/refresh-session";
import { env } from "./lib/env";

const app = express();

/* -----------------------------------------------------------------------------------------------
 * middlewares
 * -----------------------------------------------------------------------------------------------*/

app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());

// custom middlewares

app.use(refreshSessionMiddleware);

/* -----------------------------------------------------------------------------------------------
 * routes
 * -----------------------------------------------------------------------------------------------*/

app.use("/", home);
app.use("/auth", auth);
app.use("/ping", ping);

app.listen(env.PORT, () => {
  console.log("🚀 Server is running on e:", env.PORT);
});
