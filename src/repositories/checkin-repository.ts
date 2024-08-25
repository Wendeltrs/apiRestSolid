import { CheckIn, Prisma } from "@prisma/client";

export interface CheckinRepository{
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}