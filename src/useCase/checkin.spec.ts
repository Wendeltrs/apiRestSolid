import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { CheckinUseCase } from './checkin'

let checkinRepository: InMemoryCheckinRepository
let sut: CheckinUseCase

describe('Check in Use Case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new CheckinUseCase(checkinRepository)
    })

    it('Should be able to check in', async () => {
        const { checkin } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkin.id).toEqual(expect.any(String))
    })
})