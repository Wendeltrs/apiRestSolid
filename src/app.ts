import fastify from "fastify";
import { PrismaClient } from '@prisma/client'

export const app = fastify()

const prisma = new PrismaClient() //Instanciando o BD

prisma.user.create({
    data: {
        nome: 'Wendel Tavares',
        email: 'wendel@exemplo.com'
    }
})