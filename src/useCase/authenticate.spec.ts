import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new AuthenticateUseCase(usersRepository)
    })

    it('Should be able to authenticate', async () => {
        await usersRepository.create({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            email: 'wendel@oiiexemplo.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not be able to authenticate with wrong email', async () => {
        await expect(() => 
            sut.execute({
                email: 'wendel@oiiexemplo.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('Should not be able to authenticate with wrong password', async () => {
        await usersRepository.create({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password_hash: await hash('123456', 6)
        })

        await expect(() => 
            sut.execute({
                email: 'wendel@oiiexemplo.com',
                password: '123453'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})