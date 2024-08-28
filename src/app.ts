import fastify from "fastify";
import { ZodError } from "zod";
import { env } from "./env";
import { fastifyJwt } from '@fastify/jwt'
import { usersRoutes } from '../src/http/controllers/users/routes'
import { gymsRoutes } from '../src/http/controllers/gyms/routes'
import { checkinRoutes } from "./http/controllers/checkin/routes";

export const app = fastify()

app.register(fastifyJwt, {
    secret: env.JWT_SECRET
})

app.register(usersRoutes)
app.register(gymsRoutes)
//app.register(checkinRoutes)

app.setErrorHandler((error, _req, rep) => {
    if(error instanceof ZodError){
        return rep.status(400).send({ message: 'Validation error!', issues: error.format() })
    }

    if(env.NODE_ENV != 'production'){
        console.error(error)
    }else{
        //Another tratement error
    }

    return rep.status(500).send({ message: 'Internal Server Error!' })
})