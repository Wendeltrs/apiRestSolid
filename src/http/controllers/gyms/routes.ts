import { FastifyInstance } from "fastify";
import { verify } from "../../middlewares/verify";
import { searchGym } from "./search";
import { nearbyGym } from "./nearby";
import { createGym } from "./create";


export async function gymsRoutes(app:FastifyInstance) {
    app.addHook('onRequest', verify)

    app.get('/gyms/search', searchGym)
    app.get('/gyms/nearby', nearbyGym)

    app.post('/gyms', createGym)
}