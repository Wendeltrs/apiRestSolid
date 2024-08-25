import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InMemoryGymRepository } from 'src/repositories/in-memory/in-memory-gym-repository'
import { CreateGymUseCase } from './create-gym'

let gymRepository: InMemoryGymRepository
let sut: CreateGymUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        gymRepository = new InMemoryGymRepository()
        sut = new CreateGymUseCase(gymRepository)
    })

    it('Should be able to create gym', async () => {
        const { gym } = await sut.execute({
            title: 'JS Gym',
            description: null,
            phone: null,
            latitude: -22.9604149,
            longitude: -43.3608231
        })

        expect(gym.id).toEqual(expect.any(String))
    })
})