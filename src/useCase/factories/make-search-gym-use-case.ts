import { PrismaGymRepository } from "src/repositories/prisma/prisma-gym-repository"
import { SearchGymUseCase } from "../search-gym"

export function makeSearchGymUseCase(){
    const gymRepository = new PrismaGymRepository() //Inversão de dependências
    const useCase = new SearchGymUseCase(gymRepository)

    return useCase
}