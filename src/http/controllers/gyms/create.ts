import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCreateGymUseCase } from '../../../useCase/factories/make-create-gym-use-case'

export async function createGym(req: FastifyRequest, rep: FastifyReply) {
    const createGymBodySchema = z.object({
        title: z.string(),
        description: z.string().nullable(),
        phone: z.string().nullable(),
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { title, phone, description, latitude, longitude } = createGymBodySchema.parse(req.body)

    const createGymUseCase = makeCreateGymUseCase()

    await createGymUseCase.execute({
        title,
        description,
        phone,
        latitude,
        longitude
    })

    return rep.status(201).send()
}