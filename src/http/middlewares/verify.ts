import { FastifyReply, FastifyRequest } from "fastify";

export async function verify(req: FastifyRequest, rep: FastifyReply) {
    try{
        await req.jwtVerify() //Chama a rota se houver token
    }catch(err){
        console.log(err)
        return rep.status(401).send({ message: 'Unathorized!' })
    }
}