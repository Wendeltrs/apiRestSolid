import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserProfileUseCase(usersRepository)
    })

    it('Should be able to get user profile', async () => {
        const createdUser = await usersRepository.create({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password_hash: await hash('123456', 6)
        })

        const { user } = await sut.execute({
            userId: createdUser.id
        })

        expect(user.nome).toEqual('Wendel Tavares')
    })

    it('Should not be able to get user profile with wrong id', async () => {
        expect(() => 
            sut.execute({
                userId: 'no-existing id'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })
})