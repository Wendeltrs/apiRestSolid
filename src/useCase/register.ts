import { prisma } from "../lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    nome: string,
    email: string,
    password: string
}

export class RegisterUseCase {
    constructor(private usersRepository: any){} //Inversão de dependência: recebe a dependência como parâmetro

    async execute({ nome, email, password }:RegisterUseCaseRequest) {
        const password_hash = await hash(password, 6) //Criptografando a senha
    
        const userWithSameEmail = await prisma.user.findUnique({ //Verifica se existe um email criado
            where: {
                email
            }
        })
    
        if(userWithSameEmail){
            throw new Error('Email already exists!')
        }
    
        this.usersRepository.create({
            nome,
            email,
            password_hash
        })
    }
}