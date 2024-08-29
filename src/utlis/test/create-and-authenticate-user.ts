import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import { prisma } from 'src/lib/prisma'
import request from 'supertest'

export async function createAndAuthenticateUSer(app: FastifyInstance, isAdmin = false) {
    await prisma.user.create({
        data: {
            nome: 'Wendel Tavares',
            email: 'wendel@example.com',
            password_hash: await hash('123456', 6),
            role: isAdmin ? 'ADMIN' : 'MEMBER'
        }
    })

    await request(app.server).post('/users').send({
        nome: 'Wendel Tavares',
        email: 'wendel@example.com',
        password: '123456'
    })

    const authenticateResponse = await request(app.server).post('/sessions').send({
        email: 'wendel@example.com',
        password: '123456'
    })

    const { token } = authenticateResponse.body

    return { token }
}