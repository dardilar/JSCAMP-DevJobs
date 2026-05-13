import * as z from "zod";

const jobSchema = z.object({
  titulo: z.string(),
  empresa: z.string(),
  ubicacion: z.string(),
  descripcion: z.string(),
  data: z.object({
    technology: z.array(z.string()),
    modalidad: z.string(),
    nivel: z.string(),
  }),
});

export function validateJob(job) {
  return jobSchema.safeParse(job);
}

export function validatePartialJob(job) {
  return jobSchema.partial().safeParse(job);
}

export default jobSchema;