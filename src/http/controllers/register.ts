import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { registerUseCase } from "../../useCase/register"

export async function register(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { nome, email, password} = registerBodySchema.parse(req.body)

    try {
        await registerUseCase({ nome, email, password})
    } catch (error) {
        return rep.status(409).send()
    }

    return rep.status(201).send()
}