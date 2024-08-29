import { PrismaCheckinsRepository } from "../../repositories/prisma/prisma-checkins-repository"
import { ValidateCheckinUseCase } from "../validate-checkin"

export function makeValidateCheckinUseCase(){
    const checkinRepository = new PrismaCheckinsRepository() //Inversão de dependências
    const useCase = new ValidateCheckinUseCase(checkinRepository)

    return useCase
}