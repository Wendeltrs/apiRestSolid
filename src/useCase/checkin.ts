import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "src/repositories/checkin-repository";

interface CheckinUseCaseRequest{
    userId: string
    gymId: string
}
interface CheckinUseCaseResponse{
    checkin: CheckIn
}

export class CheckinUseCase{
    constructor(private checkinRepository: CheckinRepository){}

    async execute({ userId, gymId }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        const checkinOnSameDay = await this.checkinRepository.findByUserIdOnDate(
            userId,
            new Date()
        )

        if(checkinOnSameDay){
            throw new Error()
        }

        const checkin = await this.checkinRepository.create({
            user_id: userId,
            gym_id: gymId
        })

        return { checkin }
    }
}