import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "src/repositories/checkin-repository";
import { GymRepository } from "src/repositories/gym-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";
import { getDistanceBetweenCordinates } from "src/utlis/get-distance-between-cordinates";

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

    async execute({ userId, gymId, userLatitude, userLongitude }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse>{
        const gym = await this.gymRepository.findById(gymId)

        if(!gym) throw new ResourceNotFoundError()

        const distance = getDistanceBetweenCordinates(
            { latitude: userLatitude, longitude: userLongitude } , 
            { latitude: gym.latitude.toNumber(), longitude: gym.longitude.toNumber()}
        )

        const MAX_Distance_In_Kilometers = 0.1

        if(distance > MAX_Distance_In_Kilometers){ //Dispara um erro caso as distâncias sejam maiores que 100m
            throw new Error
        }

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