import express from "express";
import cookieParser from "cookie-parser";

import { env } from "./lib/utils";
import { auth, home, ping } from "./routes";
import { refreshSessionMiddleware } from "./middleware/refresh-session";

const app = express();

const PORT = env("PORT");

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

app.listen(PORT, () => {
  console.log("🚀 Server is running on port:", PORT);
});
