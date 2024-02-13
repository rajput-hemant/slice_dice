import { Router } from "express";

export const ping = Router();

ping.get("/", (req, res) => {
  const headers = req.headers;

  console.log("headers", headers);

  let text = "Pong! 🏓\n";
  text += `\nurl: ${req.url}\n\nheaders:\n`;

  Object.entries(headers).forEach(([k, v]) => {
    text += `\n${k}: ${v}`;
  });

  res.type("text/plain").send(text);
});
