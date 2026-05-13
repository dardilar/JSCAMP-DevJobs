import express from "express";
import cors from "cors";

import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();


app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] Request: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
