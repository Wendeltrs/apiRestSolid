import { FastifyInstance } from "fastify";
import { verify } from "../../middlewares/verify";
import { create } from "./create";
import { validate } from "./validate";
import { history } from "./history";
import { metrics } from "./metrics";
import { verifyUserRole } from "../../../http/middlewares/verifyUserRole";


export async function checkinRoutes(app:FastifyInstance) {
    app.addHook('onRequest', verify)

    app.get('/checkin/history', history)
    app.get('/checkin/metrics', metrics)

    app.post('/gyms/:gymId/checkin', create)

    app.patch('/checkin/:checkinId/validate', {onRequest: [ verifyUserRole('ADMIN') ]} , validate)
}