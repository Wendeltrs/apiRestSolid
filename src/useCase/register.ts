import { UserRepository } from "../repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"
import type { User } from "@prisma/client"

interface RegisterUseCaseRequest {
    nome: string,
    email: string,
    password: string
}

interface RegisterUseCaseResponse {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UserRepository){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ nome, email, password }:RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
        const password_hash = await hash(password, 6) //Criptografando a senha
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email) //Verifica se existe um email criado
    
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
    
        const user = await this.usersRepository.create({
            nome,
            email,
            password_hash
        })

        return { user }         
    }
}