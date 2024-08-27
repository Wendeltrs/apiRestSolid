import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { UserAlreadyExistsError } from "../../../useCase/errors/user-already-exists-error"
import { makeRegisterUseCase } from "../../../useCase/factories/make-register-use-case"

export async function register(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { nome, email, password} = registerBodySchema.parse(req.body)

    try {
        const registerUseCase = makeRegisterUseCase()

        await registerUseCase.execute({
            nome,
            email,
            password
        })
    } catch (error) {
        if(error instanceof UserAlreadyExistsError){
            return rep.status(409).send({ message: error.message})
        }

        throw error
    }

    return rep.status(201).send()
}