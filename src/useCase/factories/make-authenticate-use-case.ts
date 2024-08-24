import { PrismaUsersRepository } from "../../repositories/prisma/prisma-users-repository"
import { AuthenticateUseCase } from "../authenticate"

export function makeAuthenticateUseCase(){
    const usersRepository = new PrismaUsersRepository() //Inversão de dependências
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    return authenticateUseCase
}