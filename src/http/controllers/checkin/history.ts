import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeFetchUsersCheckinHistoryUseCase } from "src/useCase/factories/make-fetch-users-checkins-history-use-case"

export async function history(req: FastifyRequest, rep: FastifyReply) {
    const checkinHistoryQuerySchema = z.object({
        page: z.coerce.number().min(1).default(1)
    })

    const { page } = checkinHistoryQuerySchema.parse(req.query)

    const checkinHistoryUseCase = makeFetchUsersCheckinHistoryUseCase()

    const { checkin } = await checkinHistoryUseCase.execute({
        userId: req.user.sub,
        page
    })

    return rep.status(200).send({ checkin })
}