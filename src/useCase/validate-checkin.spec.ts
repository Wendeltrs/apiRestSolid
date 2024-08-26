import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { ValidateCheckinUseCase } from './validate-checkin'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { LateCheckinError } from './errors/late-checkin-error'

let checkinRepository: InMemoryCheckinRepository
let sut: ValidateCheckinUseCase

describe('Validate the Check in Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new ValidateCheckinUseCase(checkinRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to validate the check in', async () => {
        const createdCheckin = await checkinRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const { checkin } = await sut.execute({
            checkinId: createdCheckin.id
        })

        expect(checkin.validated_at).toEqual(expect.any(Date))
        expect(checkinRepository.itens[0].validated_at).toEqual(expect.any(Date))
    })

    it('Should not be able to validate an inexistent check in', async () => {
        await expect(() => 
            sut.execute({
                checkinId: 'inexistent checkin'
            })
        ).rejects.toBeInstanceOf(ResourceNotFoundError)
    })

    it('Should not be able to validate the check in after 20 minutes of its creation', async () => {
        vi.setSystemTime(new Date(2024, 7, 26, 10, 40))

        const createdCheckin = await checkinRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        const twentyOneMinutesInMs = 1000 * 60 * 21

        vi.advanceTimersByTime(twentyOneMinutesInMs)

        await expect(() => 
            sut.execute({
                checkinId: createdCheckin.id
            })
        ).rejects.toBeInstanceOf(LateCheckinError)
    })
})