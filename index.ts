import express from "express";
import cookieParser from "cookie-parser";

import { env } from "./lib/utils";
import { home, ping } from "./routes";

const app = express();

const PORT = env("PORT");

/* -----------------------------------------------------------------------------------------------
 * middlewares
 * -----------------------------------------------------------------------------------------------*/

app.use(express.json(), express.urlencoded({ extended: true }), cookieParser());

/* -----------------------------------------------------------------------------------------------
 * routes
 * -----------------------------------------------------------------------------------------------*/

app.use("/", home);
app.use("/ping", ping);

app.listen(PORT, () => {
  console.log("🚀 Server is running on port:", PORT);
});
