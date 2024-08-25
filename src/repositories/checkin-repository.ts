import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
    findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>
}