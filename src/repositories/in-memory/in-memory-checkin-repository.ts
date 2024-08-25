import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckinRepository } from "../checkin-repository";

export class InMemoryCheckinRepository implements CheckinRepository{ //Cria uma representação do BD
    public itens: CheckIn[] = []

    async create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
        const checkin = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            validated_at: data.validated_at ? new Date(data.validated_at) : null,
            created_at: new Date()
        }

        return checkin
    }

}