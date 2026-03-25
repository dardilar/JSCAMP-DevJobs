import express from "express";
import jobs from "./jobs.json" with { type: "json" };

const PORT = process.env.PORT ?? 1234;
const app = express();

app.use((req, res, next) => {
  const timeString = new Date().toLocaleTimeString();
  console.log(`[${timeString}] Request: ${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  return res.send("Hello World!");
});

app.get("/health", (req, res) => {
  return res.json({
    status: "OK",
    uptime: process.uptime(),
  });
});

app.get("/get-jobs", (req, res) => {
  const { text, title, limit, offset, technology, level } = req.query;
  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase();

    filteredJobs = filteredJobs.filter(
      (job) =>
        job.titulo.toLowerCase().includes(searchTerm) ||
        job.descripcion.toLowerCase().includes(searchTerm),
    );
  }

  if (technology) {
    const searchTech = technology.toLowerCase();

    filteredJobs = filteredJobs.filter((job) =>
      job.tecnologias.toLowerCase().includes(searchTech),
    );
  }

  return res.json(filteredJobs);
});

app.get("/get-job/:id", (req, res) => {
  const { id } = req.params;
  const idNumber = Number(id);

  return res.json({ id: idNumber, title: "Developer" });
});

//Opcional -> /acd o /abcd
app.get("/a{b}cd", (req, res) => {
  return res.send("ACD o ABCD");
});

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
