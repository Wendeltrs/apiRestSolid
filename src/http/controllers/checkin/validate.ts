import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { makeValidateCheckinUseCase } from "src/useCase/factories/make-validate-checkin-use-case"

export async function validate(req: FastifyRequest, rep: FastifyReply) {
    const vaildateCheckinParamsSchema = z.object({
        checkinId: z.string().uuid()
    })

    const { checkinId } = vaildateCheckinParamsSchema.parse(req.params)

    const validateCheckinUseCase = makeValidateCheckinUseCase()

    await validateCheckinUseCase.execute({
        checkinId
    })

    return rep.status(204).send()
}