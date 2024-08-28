import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeSearchGymUseCase } from "src/useCase/factories/make-search-gym-use-case"

export async function searchGym(req: FastifyRequest, rep: FastifyReply) {
    const searchGymQuerySchema = z.object({
        q: z.string(),
        page: z.coerce.number().min(1).default(1)
    })

    const { q, page } = searchGymQuerySchema.parse(req.body)

    const searchGymUseCase = makeSearchGymUseCase()

    const { gym } = await searchGymUseCase.execute({
        query: q,
        page
    })

    return rep.status(201).send({ gym })
}