import { User, Prisma } from "@prisma/client";
import { UserRepository } from "../users-repository";

export class InMemoryUsersRepository implements UserRepository{ //Cria uma representação do BD
    public itens: User[] = []

    async findByEmail(email: string) {
        const user = this.itens.find(item => item.email == email)

        if(!user) return null

        return user
    }

    async create(data: Prisma.UserCreateInput) {
        const user = {
            id: 'user-1',
            nome: data.nome,
            email: data.email,
            password_hash: String(data.password_hash),
            creates_at: new Date()
        }

        this.itens.push(user)

        return user
    }

}