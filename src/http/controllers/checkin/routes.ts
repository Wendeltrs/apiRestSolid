import { FastifyInstance } from "fastify";
import { verify } from "../../middlewares/verify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";


export async function checkinRoutes(app:FastifyInstance) {
    app.addHook('onRequest', verify)

    app.get('check_ins/history', history)
    app.get('check_ins/metrics', metrics)

    app.post('/gyms/:gymId/check_ins', create)

    app.patch('check_ins/:checkinId/validate', validate)
}