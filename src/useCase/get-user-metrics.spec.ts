import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { FetchUsersCheckinsHistoryUseCase } from './fetch-users-checkins-history'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkinRepository: InMemoryCheckinRepository
let sut: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
    beforeEach(async () => {
        checkinRepository = new InMemoryCheckinRepository()
        sut = new GetUserMetricsUseCase(checkinRepository)
    })

    it('Should be able to get checkins count from metrics', async () => {
        await checkinRepository.create({
            gym_id: 'gym-01',
            user_id: 'user-01'
        })

        await checkinRepository.create({
            gym_id: 'gym-02',
            user_id: 'user-01'
        })

        const { checkinCount } = await sut.execute({
            userId: 'user-01'
        })

        expect(checkinCount).toEqual(2)
    })
})