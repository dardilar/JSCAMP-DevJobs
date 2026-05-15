process.loadEnvFile();

import { Router } from "express";
import OpenAI from "openai";
import rateLimit from "express-rate-limit";
import { JobModel } from "../models/job.js";
import { CONFIG } from "../config.js";

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per minute
  message: 'Too many AI requests, please try again later.',
  legacyHeaders: false,
  standardHeaders: 'draft-8'
})

export const aiRouter = Router();
aiRouter.use(aiRateLimiter);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

aiRouter.get('/summary/:id', async (req, res) => {
    const { id } = req.params;
    const job = await JobModel.getById(id);

    if (!job) {
        return res.status(404).json({ message: 'Job not found' });
    }

    const systemPrompt = "Eres un asistente que resume ofertas de trabajo de manera clara y concisa, evita cualquier otro texto que no sea el resumen. Solo responde con el resumen de la oferta de trabajo"

    // Call OpenAI API to summarize the job description
    const prompt = [
        `Resume en 4-6 frases la siguiente oferta de trabajo`,
        `Incluye: rol, empresa, ubicación y requisitos clave`,
        `Usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicación: ${job.ubicacion}`,
        `Descripción: ${job.descripcion}`
    ].join('\n')

    try {
        const completion = await openai.chat.completions.create({
            model: CONFIG.MODEL_AI,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: prompt
                }
            ]
        })
        
        console.log('OpenAI response:', completion);
        const summary = completion.choices?.[0]?.message?.content?.trim();
        
        if(!summary) {
            return res.status(500).json({ message: 'Error al generar el resumen' })
        }
        return res.json({ summary });

    } catch (error) {
        console.error('Error generating summary:', error);
        return res.status(500).json({ message: 'Error al generar el resumen' })
    }
})