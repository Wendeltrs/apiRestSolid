import { FastifyInstance } from "fastify";
import { register } from "./register";
import { authenticate } from "./authenticate";
import { profile } from "./profile";
import { verify } from '../../middlewares/verify'
import { refresh } from "./refresh";

export async function usersRoutes(app:FastifyInstance) {
    app.post('/users', register)
    app.post('/sessions', authenticate)

    app.get('/me', { onRequest: [verify] }, profile) //Só vai ser chamada se o usuário for autenticado

    app.patch('/token/refresh', refresh) //Revalida um usuário
}