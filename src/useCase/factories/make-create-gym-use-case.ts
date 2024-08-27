import { CreateGymUseCase } from "../create-gym"
import { PrismaGymRepository } from "src/repositories/prisma/prisma-gym-repository"

export function makeCreateGymUseCase(){
    const gymRepository = new PrismaGymRepository() //Inversão de dependências
    const useCase = new CreateGymUseCase(gymRepository)

    return useCase
}