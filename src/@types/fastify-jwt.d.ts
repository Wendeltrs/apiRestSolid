import "@fastify/jwt"

declare module "@fastify/jwt" {
    export interface FastifyJWT extends FastifyRequest{
        //payload: {} //payload type is used for signing and verifying 
        user: { // user type is return type of `request.user` object
            sub: string
            role: 'ADMIN' | 'MEMBER' 
        } 
    }
}