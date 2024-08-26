import { prisma } from "../../lib/prisma";
import { Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class PrismaUsersRepository implements UserRepository {
    async findById(id: string) {
        const user = await prisma.user.findUnique({ //Verifica se existe um email criado
            where: {
                id
            }
        })

        return user
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ //Verifica se existe um email criado
            where: {
                email
            }
        })

        return user
    }
    
    async create(data: Prisma.UserCreateInput){
        const user = await prisma.user.create({ data })
        
        return user
    }
}