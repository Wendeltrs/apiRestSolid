import { PrismaUsersRepository } from "../repositories/prisma-users-repository"
import { prisma } from "../lib/prisma"
import { hash } from "bcryptjs"

interface RegisterUseCaseRequest {
    nome: string,
    email: string,
    password: string
}

export async function registerUseCase({ nome, email, password }:RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6) //Criptografando a senha

    const userWithSameEmail = await prisma.user.findUnique({ //Verifica se existe um email criado
        where: {
            email
        }
    })

    if(userWithSameEmail){
        throw new Error('Email already exists!')
    }

    const prismaUsersRepository = new PrismaUsersRepository()

    prismaUsersRepository.create({
        nome,
        email,
        password_hash
    })
}