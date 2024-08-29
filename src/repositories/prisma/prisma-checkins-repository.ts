import { Prisma, CheckIn } from "@prisma/client";
import { CheckinRepository } from "../checkin-repository";
import { prisma } from "../../lib/prisma";
import dayjs from "dayjs";

export class PrismaCheckinsRepository implements CheckinRepository{
    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkin = await prisma.checkIn.create({
            data
        })

        return checkin
    }

    async findByUserIdOnDate(userId: string, date: Date) {
        const startOfTheDay = dayjs(date).startOf('date')
        const endOfTheDay = dayjs(date).endOf('date')

        const checkin = await prisma.checkIn.findFirst({
            where: {
                user_id: userId,
                created_at: {
                    gte: startOfTheDay.toDate(),
                    lte: endOfTheDay.toDate()
                }
            }
        })

        return checkin
    }

    async findManyByUserId(userId: string, page: number) {
        const checkin = await prisma.checkIn.findMany({
            where: {
                user_id: userId
            },
            take: 20,
            skip: (page - 1) * 20
        })

        return checkin
    }

    async countByUserId(user_id: string){
        const checkin = await prisma.checkIn.count({
            where: {
                user_id
            }
        })

        return checkin
    }

    async findById(id: string) {
        const checkin = await prisma.checkIn.findUnique({
            where: {
                id
            }
        })

        return checkin
    }

    async save(data: CheckIn) {
        const checkin = await prisma.checkIn.update({
            where: {
                id: data.id
            },
            data
        })

        return checkin
    }

}