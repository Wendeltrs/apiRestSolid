import fastify from "fastify";
import { z } from "zod";
import { prisma } from "./lib/prisma";

export const app = fastify()

app.post('/users', async (req, rep) => {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { nome, email, password} = registerBodySchema.parse(req.body)

    await prisma.user.create({
        data: {
            nome,
            email,
            password_hash: password
        }
    })

    return rep.status(201).send()
})