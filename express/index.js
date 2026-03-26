import express from "express";
import cors from "cors";

import jobs from "./jobs.json" with { type: "json" };
import { DEFAULTS } from "./config.js";

const PORT = process.env.PORT ?? DEFAULTS.PORT;
const app = express();

const ACCEPTED_ORIGINS = [
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(
  cors({
    origin: (origin, callback) => {
     if(ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true);
     } else {
      callback(new Error('Not allowed by CORS'));
     }
    }
}));

app.use(express.json());

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

// CRUD: Create, Read, Update, Delete

app.get("/jobs", (req, res) => {
  const { text, title, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION, technology, level } = req.query;
  
  const limitNumber = Number(limit);
  const offsetNumber = Number(offset);
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

  const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limitNumber);

  return res.json({data: paginatedJobs, total: filteredJobs.length, limit: limitNumber, offset: offsetNumber});
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if(!job) {
    return res.status(404).json({ error: "Job not found" });
  }

  return res.json(job);
});

app.post("/jobs", (req, res) => {
  const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

  const newJob = {
    id: crypto.randomUUID(),
    titulo,
    empresa,
    ubicacion,
    descripcion,
    data,
    content,
  };

  jobs.push(newJob); // TODO: Guardar en base de datos con un INSERT
  
  return res.status(201).json(newJob);
});

// Reemplazar un recurso completo
app.put("/jobs/:id", (req, res) => {
  //TODO: Implementar actualización de trabajo
});

// Actualizar parcialmente un recurso
app.patch("/jobs/:id", (req, res) => {
  //TODO: Implementar actualización parcial de trabajo
});

app.delete("/jobs/:id", (req, res) => {
  //TODO: Implementar eliminación de trabajo
});

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
