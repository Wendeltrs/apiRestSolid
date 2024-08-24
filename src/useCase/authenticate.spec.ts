import { describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Register Use Case', () => {
    it('Should be able to authenticate', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

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
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        expect(() => 
            sut.execute({
                email: 'wendel@oiiexemplo.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })

    it('Should not be able to authenticate with wrong password', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const sut = new AuthenticateUseCase(usersRepository)

        await usersRepository.create({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password_hash: await hash('123456', 6)
        })

        expect(() => 
            sut.execute({
                email: 'wendel@oiiexemplo.com',
                password: '123453'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})