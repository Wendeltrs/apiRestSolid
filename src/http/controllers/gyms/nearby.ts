import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchNearbyGymsUseCase } from "src/useCase/factories/make-fetch-nearby-gyms-use-case"

export async function nearby(req: FastifyRequest, rep: FastifyReply) {
    const nearbyGymQuerySchema = z.object({
        latitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 90
        }),
        longitude: z.coerce.number().refine((value) => {
            return Math.abs(value) <= 180
        })
    })

    const { latitude, longitude } = nearbyGymQuerySchema.parse(req.query)

    const nearbyGymUseCase = makeFetchNearbyGymsUseCase()

    const { gym } = await nearbyGymUseCase.execute({
        userLatitude: latitude,
        userLongitude: longitude
    })

    return rep.status(200).send({ gym })
}