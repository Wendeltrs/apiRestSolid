import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../../useCase/authenticate"
import { InvalidCredentialsError } from "../../useCase/errors/invalid-credentials-error"

export async function authenticate(req: FastifyRequest, rep: FastifyReply) {
    const authenticateBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { email, password} = authenticateBodySchema.parse(req.body)

    try {
        const usersRepository = new PrismaUsersRepository() //Inversão de dependências
        const authenticateUseCase = new AuthenticateUseCase(usersRepository)

        await authenticateUseCase.execute({
            email,
            password
        })
    } catch (error) {
        if(error instanceof InvalidCredentialsError){
            return rep.status(400).send({ message: error.message})
        }

        throw error
    }

    return rep.status(200).send()
}