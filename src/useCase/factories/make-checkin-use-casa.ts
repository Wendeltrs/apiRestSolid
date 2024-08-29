import { PrismaCheckinsRepository } from "../../repositories/prisma/prisma-checkins-repository"
import { CheckinUseCase } from "../checkin"
import { PrismaGymRepository } from "../../repositories/prisma/prisma-gym-repository"

export function makeCheckinUseCase(){
    const checkinRepository = new PrismaCheckinsRepository() //Inversão de dependências
    const gymRepository = new PrismaGymRepository()
    const useCase = new CheckinUseCase(checkinRepository, gymRepository)

    return useCase
}