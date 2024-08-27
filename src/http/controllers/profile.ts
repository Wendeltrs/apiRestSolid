import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../useCase/factories/make-get-user-profile-use-case";

export async function profile(req: FastifyRequest, rep: FastifyReply) {    
    const getUserProfile = makeGetUserProfileUseCase()

    const { user } = await getUserProfile.execute({
        userId: req.user.sub
    })

    return rep.status(200).send({ 
        user: {
            ...user, 
            password_hash: undefined
        }
    })
}