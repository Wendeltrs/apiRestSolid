import { FastifyInstance } from "fastify";
import { register } from "./controllers/register";
import { authenticate } from "./controllers/authenticate";
import { profile } from "./controllers/profile";
import { verify } from '../../src/http/middlewares/verify'

export async function appRoutes(app:FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verify] }, profile) //Só vai ser chamada se o usuário for autenticado
}