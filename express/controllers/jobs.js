import { DEFAULTS } from "../config.js";
import { JobModel } from "../models/job.js";

export class JobController {
  static async getHealth(req, res) {
    return res.json({
      status: "OK",
      uptime: process.uptime(),
    });
  }
  
  static async getAll(req, res) {
    const {
      text,
      title,
      limit = DEFAULTS.LIMIT_PAGINATION,
      offset = DEFAULTS.OFFSET_PAGINATION,
      technology,
      level,
    } = req.query;

    const { data, total } = await JobModel.getAll({
      text,
      limit,
      offset,
      technology,
      level,
    });

    return res.json({
      data,
      total,
      limit,
      offset,
    });
  }

  static async getId(req, res) {
    const { id } = req.params;
    
    const job = await JobModel.getById(id);

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, descripcion, data, content } = req.body;

    const newJob = await JobModel.create({
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    });

    return res.status(201).json(newJob);
  }

  static async update(req, res) {}
  static async partialUpdate(req, res) {}
  static async delete(req, res) {}
}
