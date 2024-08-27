import { PrismaCheckinsRepository } from "src/repositories/prisma/prisma-checkins-repository"
import { FetchUsersCheckinsHistoryUseCase } from "../fetch-users-checkins-history"

export function makeFetchUsersCheckinHistoryUseCase(){
    const checkinRepository = new PrismaCheckinsRepository() //Inversão de dependências
    const useCase = new FetchUsersCheckinsHistoryUseCase(checkinRepository)

    return useCase
}