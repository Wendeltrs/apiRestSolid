import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { InvalidCredentialsError } from "../../../useCase/errors/invalid-credentials-error"
import { makeAuthenticateUseCase } from "../../../useCase/factories/make-authenticate-use-case"

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password} = authenticateBodySchema.parse(req.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()

        const { user } = await authenticateUseCase.execute({
            email,
            password
        })

        const token = await rep.jwtSign({}, { sign: { sub: user.id } })

        return rep.status(200).send({ token })
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return rep.status(400).send({ message: error.message})
        }

        throw error
    }

}