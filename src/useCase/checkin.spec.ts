import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { CheckinUseCase } from './checkin'
import { InMemoryGymRepository } from 'src/repositories/in-memory/in-memory-gym-repository'
import { Decimal } from '@prisma/client/runtime/library' 

let checkinRepository: InMemoryCheckinRepository
let gymRepository: InMemoryGymRepository
let sut: CheckinUseCase

describe('Check in Use Case', () => {
    beforeEach(() => {
        checkinRepository = new InMemoryCheckinRepository()
        gymRepository = new InMemoryGymRepository()
        sut = new CheckinUseCase(checkinRepository, gymRepository)

        gymRepository.itens.push({
            id: 'gym-01',
            title: 'JS Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-22.9604149),
            longitude: new Decimal(-43.3608231),
        })

        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
    })

    it('Should be able to check in', async () => {
        const { checkin } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -22.9604149,
            userLongitude: -43.3608231
        })

        expect(checkin.id).toEqual(expect.any(String))
    })

    it('Should not be able to check in twice in the same day', async () => {
        vi.setSystemTime(new Date(2024, 7, 25, 10, 0, 0)) //Cria uma data falsa para rodar o teste

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -22.9604149,
            userLongitude: -43.3608231
        })

        expect(() => 
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-01',
                userLatitude: -22.9604149,
                userLongitude: -43.3608231
            })
        ).rejects
    })

    it('Should be able to check in twice but in different days', async () => {
        vi.setSystemTime(new Date(2024, 7, 25, 10, 0, 0)) //Cria uma data falsa para rodar o teste

        await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -22.9604149,
            userLongitude: -43.3608231
        })

        vi.setSystemTime(new Date(2024, 7, 26, 10, 0, 0))

        const { checkin } = await sut.execute({
            userId: 'user-01',
            gymId: 'gym-01',
            userLatitude: -22.9604149,
            userLongitude: -43.3608231
        })

        expect(checkin.id).toEqual(expect.any(String))
    })
    
    it('Should not be able to check in on distant gym', async () => {
        gymRepository.itens.push({
            id: 'gym-02',
            title: 'JS Gym',
            description: '',
            phone: '',
            latitude: new Decimal(-22.9604149),
            longitude: new Decimal(-43.3608231),
        })

        await expect(() => 
            sut.execute({
                userId: 'user-01',
                gymId: 'gym-02',
                userLatitude: -22.9587436,
                userLongitude: -43.3667872
            })
        ).rejects.toBeInstanceOf(Error)
    })
})