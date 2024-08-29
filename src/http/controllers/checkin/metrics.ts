import { FastifyReply, FastifyRequest } from "fastify"
import { makeGetUserMetricsUseCase } from "src/useCase/factories/make-get-user-metrics-use-case"

export async function metrics(req: FastifyRequest, rep: FastifyReply) {
    const getUserMetricsUseCase = makeGetUserMetricsUseCase()

    const { checkinCount } = await getUserMetricsUseCase.execute({
        userId: req.user.sub
    })

    return rep.status(200).send({ checkinCount })
}