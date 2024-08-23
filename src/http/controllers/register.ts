import { FastifyReply, FastifyRequest } from "fastify"
import { z } from "zod"
import { prisma } from "../../lib/prisma"
import { hash } from 'bcryptjs'

export async function register(req: FastifyRequest, rep: FastifyReply) {
    const registerBodySchema = z.object({
        nome: z.string(),
        email: z.string().email(),
        password: z.string().min(6)
    })

    const { nome, email, password} = registerBodySchema.parse(req.body)

    const password_hash = await hash(password, 6) //Criptografando a senha

    const userWithSameEmail = await prisma.user.findUnique({ //Verifica se existe um email criado
        where: {
            email
        }
    })

    if(userWithSameEmail){
        return rep.status(409).send()
    }

    await prisma.user.create({
        data: {
            nome,
            email,
            password_hash
        }
    })

    return rep.status(201).send()
}