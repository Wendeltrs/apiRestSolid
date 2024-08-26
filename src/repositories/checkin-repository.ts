import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
    findManyByUserId(userId: string, page: number): Promise<CheckIn[]>
    countByUserId(userId: string): Promise<number>
    findById(id: string): Promise<CheckIn | null>
    save(checkin: CheckIn): Promise<CheckIn>

}