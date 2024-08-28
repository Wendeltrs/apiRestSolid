import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeCheckinUseCase } from "src/useCase/factories/make-checkin-use-casa"

export async function create(req: FastifyRequest, rep: FastifyReply) {
    const createCheckinParamsSchema = z.object({
        gymId: z.string().uuid()
    })

    const createCheckinBodySchema = z.object({
        latitude: z.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { gymId } = createCheckinParamsSchema.parse(req.body)
    const { latitude, longitude } = createCheckinBodySchema.parse(req.body)

    const checkinUseCase = makeCheckinUseCase()

    await checkinUseCase.execute({
        gymId,
        userId: req.user.sub,
        userLatitude: latitude,
        userLongitude: longitude
    })

    return rep.status(201).send()
}