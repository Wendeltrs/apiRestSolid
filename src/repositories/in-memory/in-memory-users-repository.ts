import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements UserRepository{ //Cria uma representação do BD
    public itens: User[] = []

    async findById(userId: string) {
        const user = this.itens.find(item => item.id == userId)

        if(!user) return null

        return user
    }

    async findByEmail(email: string) {
        const user = this.itens.find(item => item.email == email)

        if(!user) return null

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: randomUUID(),
            nome: data.nome,
            email: data.email,
            password_hash: String(data.password_hash),
            creates_at: new Date()
        }

        this.itens.push(user)

        return user
    }

}