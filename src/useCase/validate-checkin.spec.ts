import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { ValidateCheckinUseCase } from './validate-checkin'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let checkinRepository: InMemoryCheckinRepository
let sut: ValidateCheckinUseCase

describe('Validate the Check in Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new ValidateCheckinUseCase(checkinRepository)

        //vi.useFakeTimers()
    })

    afterEach(() => {
        //vi.useRealTimers()
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
})