import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { FetchUsersCheckinsHistoryUseCase } from './fetch-users-checkins-history'

let checkinRepository: InMemoryCheckinRepository
let sut: FetchUsersCheckinsHistoryUseCase

describe('Fetch User Check in History Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new FetchUsersCheckinsHistoryUseCase(checkinRepository)
    })

    it('Should be able to fetch check in history', async () => {
        await checkinRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkinRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkin } = await sut.execute({
            userId: 'user-01',
            page: 1
        })

        expect(checkin).toHaveLength(2)
        expect(checkin).toEqual([
            expect.objectContaining({ gym_id: 'gym-01'}),
            expect.objectContaining({ gym_id: 'gym-02'}),
        ])
    })

    it('Should be able to fetch paginated check in history', async () => {
        for( let i = 1; i <= 22; i++){
            await checkinRepository.create({
                gym_id: `gym-${i}`,
                user_id: 'user-01'
            })
        }       

        const { checkin } = await sut.execute({
            userId: 'user-01',
            page: 2
        })

        expect(checkin).toHaveLength(2)
        expect(checkin).toEqual([
            expect.objectContaining({ gym_id: 'gym-21'}),
            expect.objectContaining({ gym_id: 'gym-22'}),
        ])
    })
})