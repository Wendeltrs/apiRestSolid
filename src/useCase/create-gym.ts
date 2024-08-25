import type { Gym } from "@prisma/client"
import { GymRepository } from "src/repositories/gym-repository"

interface CreateGymUseCaseRequest {
    title: string,
    description: string | null,
    phone: string | null,
    latitude: number,
    longitude: number
}

interface CreateGymUseCaseResponse {
    gym: Gym
}

export class CreateGymUseCase {
    constructor(private gymRepository: GymRepository){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ title, description, phone, latitude, longitude }:CreateGymUseCaseRequest): Promise<CreateGymUseCaseResponse> {
    
        const gym = await this.gymRepository.create({
            title,
            description,
            phone,
            latitude,
            longitude
        })

        return { gym }         
    }
}