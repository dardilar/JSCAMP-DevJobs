import jobs from "../jobs.json" with { type: "json" };
import { DEFAULTS } from "../config.js";

export class JobModel {
  static async getAll({ text, limit = DEFAULTS.LIMIT_PAGINATION, offset = DEFAULTS.OFFSET_PAGINATION, technology }) {
    let filteredJobs = jobs;
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

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

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );

    return paginatedJobs;
  }

  static async getById(id) {
    const job = jobs.find((job) => job.id === id);
    return job;
  }

  static async create({ titulo, empresa, ubicacion, descripcion, data, content }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      descripcion,
      data,
      content,
    };

    jobs.push(newJob);
    return newJob;
  }
}
