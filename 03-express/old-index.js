import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

//Comodin -> /a*cd
app.get("/a*cd", (req, res) => {
  return res.send("Cualquier cosa que empiece con A y termine con CD");
});

//Rutas más largas que no sabemos como terminan
app.get("/file/*filename", (req, res) => {
  const { filename } = req.params;
  return res.send(`Ruta file: ${filename}`);
});

//Usando Regex
app.get(/.*fly$/, (req, res) => {
  return res.send("Ruta fly");
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
