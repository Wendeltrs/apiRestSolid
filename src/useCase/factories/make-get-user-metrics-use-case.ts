import { GetUserMetricsUseCase } from "../get-user-metrics"
import { PrismaCheckinsRepository } from "src/repositories/prisma/prisma-checkins-repository"

export function makeGetUserMetricsUseCase(){
    const checkinRepository = new PrismaCheckinsRepository() //Inversão de dependências
    const useCase = new GetUserMetricsUseCase(checkinRepository)

    return useCase
}