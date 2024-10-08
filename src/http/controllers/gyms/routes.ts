import { FastifyInstance } from "fastify";
import { verify } from "../../middlewares/verify";
import { search } from "./search";
import { nearby } from "./nearby";
import { create } from "./create";
import { verifyUserRole } from "../../../http/middlewares/verifyUserRole";


export async function gymsRoutes(app:FastifyInstance) {
    app.addHook('onRequest', verify)

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', { onRequest: [ verifyUserRole('ADMIN') ]} ,create)
}