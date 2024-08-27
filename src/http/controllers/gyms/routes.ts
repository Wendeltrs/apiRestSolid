import { FastifyInstance } from "fastify";
import { verify } from "../../middlewares/verify";


export async function gymsRoutes(app:FastifyInstance) {
    app.addHook('onRequest', verify)
}