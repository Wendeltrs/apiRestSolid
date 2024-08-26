import type { Gym } from "@prisma/client"
import { GymRepository } from "src/repositories/gym-repository"

interface FetchNearbyGymsUseCaseCaseRequest {
    userLatitude: number,
    userLongitude: number
}

interface FetchNearbyGymsUseCaseCaseResponse {
    gym: Gym[]
}

export class FetchNearbyGymsUseCaseCase {
    constructor(private gymRepository: GymRepository){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ userLatitude, userLongitude }:FetchNearbyGymsUseCaseCaseRequest): Promise<FetchNearbyGymsUseCaseCaseResponse> {
    
        const gym = await this.gymRepository.findManyNearby({ latitude: userLatitude, longitude: userLongitude })

        return { gym }         
    }
}