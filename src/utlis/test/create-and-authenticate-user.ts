import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateUSer(app: FastifyInstance) {
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