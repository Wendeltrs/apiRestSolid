import type { Gym } from "@prisma/client"
import { GymRepository } from "src/repositories/gym-repository"

interface SearchGymUseCaseRequest {
    query: string,
    page: number
}

interface SearchGymUseCaseResponse {
    gym: Gym[]
}

export class SearchGymUseCase {
    constructor(private gymRepository: GymRepository){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ query, page }:SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    
        const gym = await this.gymRepository.searchMany(query, page)

        return { gym }         
    }
}