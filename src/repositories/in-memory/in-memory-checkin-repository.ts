import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckinRepository } from "../checkin-repository";
import dayjs from "dayjs";

export class InMemoryCheckinRepository implements CheckinRepository{
    public itens: CheckIn[] = []

    async findByUserIdOnDate(userId: string, date: Date) { //Verifica se mais de um user foram criados no mesmo dia
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).startOf('date')

        const checkinOnSameDate = this.itens.find((checkin) => {
            const checkinDate = dayjs(checkin.created_at)
            const isOnSameDate = checkinDate.isAfter(startOfTheDay) && checkinDate.isBefore(endOfTheDay)

            return checkin.user_id == userId && isOnSameDate
        })

        if(!checkinOnSameDate) return null

        return checkinOnSameDate
    }

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