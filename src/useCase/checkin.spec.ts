import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { CheckinUseCase } from './checkin'
import { any } from 'zod'

let checkinRepository: InMemoryCheckinRepository
let sut: CheckinUseCase

describe('Check in Use Case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new CheckinUseCase(checkinRepository)

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {
        const { checkin } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkin.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 7, 25, 10, 0, 0)) //Cria uma data falsa para rodar o teste

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        await expect(() => 
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01'
            })
        ).rejects.toBeInstanceOf
    })

    it('Should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 7, 25, 10, 0, 0)) //Cria uma data falsa para rodar o teste

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        vi.setSystemTime(new Date(2024, 7, 26, 10, 0, 0))

        const { checkin } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01'
        })

        expect(checkin.id).toEqual(expect.any(String))
    })
})