import { Gym, Prisma } from "@prisma/client";
import { GymRepository } from "../gym-repository";
import { randomUUID } from "crypto";

export class InMemoryGymRepository implements GymRepository{ //Cria uma representação do BD
    public itens: Gym[] = []

    async findById(id: string) {
        const gym = this.itens.find(item => item.id == id)

        if(!gym) return null

        return gym
    }

    async create(data: Prisma.GymCreateInput) {
        const gym = {
            id: data.id ?? randomUUID(),
            title: data.title,
            description: data.description ?? null,
            phone: data.phone ?? null,
            latitude: new Prisma.Decimal(data.latitude.toString()),
            longitude: new Prisma.Decimal(data.longitude.toString()),
            creates_at: new Date()
        }

        this.itens.push(gym)

        return gym
    }
}