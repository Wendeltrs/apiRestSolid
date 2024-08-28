import { FastifyReply, FastifyRequest } from "fastify";

export async function verifyJWT(req: FastifyRequest, rep: FastifyReply) {
    try {
        
    } catch (error) {
        return rep.status(401).send({ message: 'Unathorized!' })
    }
}