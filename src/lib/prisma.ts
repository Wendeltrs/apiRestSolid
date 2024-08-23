import { env } from "../env";
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({ //Instanciando o BD
    log: env.NODE_ENV == 'dev' ? ['query'] : []
}) 