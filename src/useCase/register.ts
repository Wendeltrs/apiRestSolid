import { UserRepository } from "@/repositories/users-repository"
import { hash } from "bcryptjs"
import { UserAlreadyExistsError } from "./errors/user-already-exists-error"

interface RegisterUseCaseRequest {
    nome: string,
    email: string,
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: UserRepository){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ nome, email, password }:RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6) //Criptografando a senha
    
        const userWithSameEmail = await this.usersRepository.findByEmail(email) //Verifica se existe um email criado
    
        if(userWithSameEmail){
            throw new UserAlreadyExistsError()
        }
    
        this.usersRepository.create({
            nome,
            email,
            password_hash
        })
    }
}