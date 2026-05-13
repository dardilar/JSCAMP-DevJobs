import { Router } from "express";
import { JobController } from "../controllers/jobs.js";
import { validateJob, validatePartialJob } from "../schemas/jobs.js";

export const jobsRouter = Router();

const validateCreate = (req, res, next) => {
  const result = validateJob(req.body);

  if (result.success) {
    req.body = result.data;
    return next();
  }

  return res.status(400).json({ error: 'Invalid request', details: result.error.errors });
};

const validatePartialUpdate = (req, res, next) => {
  const result = validatePartialJob(req.body);

  if (result.success) {
    req.body = result.data;
    return next();
  }

  return res.status(400).json({ error: 'Invalid request', details: result.error.errors });
};

jobsRouter.get("/health", JobController.getHealth);

// CRUD: Create, Read, Update, Delete
jobsRouter.get("/", JobController.getAll);
jobsRouter.get("/:id", JobController.getId);
jobsRouter.post("/", validateCreate, JobController.create);

// Reemplazar un recurso completo
jobsRouter.put("/:id", JobController.update);

// Actualizar parcialmente un recurso
jobsRouter.patch("/:id", validatePartialUpdate, JobController.partialUpdate);

// Eliminar un recurso
jobsRouter.delete("/:id", JobController.delete);