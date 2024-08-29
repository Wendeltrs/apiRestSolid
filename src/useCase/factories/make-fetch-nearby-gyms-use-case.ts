import { PrismaGymRepository } from "../../repositories/prisma/prisma-gym-repository"
import { FetchNearbyGymsUseCaseCase } from "../fetch-nearby-gyms"

export function makeFetchNearbyGymsUseCase(){
    const gymRepository = new PrismaGymRepository() //Inversão de dependências
    const useCase = new FetchNearbyGymsUseCaseCase(gymRepository)

    return useCase
}