import { Prisma, CheckIn } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { CheckinRepository } from "../checkin-repository";
import dayjs from "dayjs";

export class InMemoryCheckinRepository implements CheckinRepository{
    public itens: CheckIn[] = []

    async countByUserId(userId: string) { //Obtém o número de chekins feitos
        return this.itens.filter((item) => item.user_id == userId).length
    }

    async findManyByUserId(userId: string, page: number) { //Obtém o historico de checkins e faz a paginação com 20 itens por página
        return this.itens
            .filter((item) => item.user_id == userId)
            .slice((page - 1) * 20, page * 20)
    }

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

        this.itens.push(checkin)

        return checkin
    }

}