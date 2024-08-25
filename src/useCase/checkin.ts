import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "src/repositories/checkin-repository";
import { GymRepository } from "src/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface CheckinUseCaseRequest{
    userId: string
    gymId: string
    userLatitude: number
    userLongitude: number
}
interface CheckinUseCaseResponse{
    checkin: CheckIn
}

export class CheckinUseCase{
    constructor(
        private checkinRepository: CheckinRepository,
        private gymRepository: GymRepository
    ){}

    async execute({ userId, gymId }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        const gym = await this.gymRepository.findById(gymId)

        if(!gym) throw new ResourceNotFoundError()

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