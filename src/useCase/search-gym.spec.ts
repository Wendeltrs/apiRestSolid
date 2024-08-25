import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryCheckinRepository } from 'src/repositories/in-memory/in-memory-checkin-repository'
import { FetchUsersCheckinsHistoryUseCase } from './fetch-users-checkins-history'
import { InMemoryGymRepository } from 'src/repositories/in-memory/in-memory-gym-repository'
import { SearchGymUseCase } from './search-gym'
import { title } from 'process'

let gymReository: InMemoryGymRepository
let sut: SearchGymUseCase

describe('Search Gyms Use Case', () => {
    beforeEach(async () => {
        gymReository = new InMemoryGymRepository()
        sut = new SearchGymUseCase(gymReository)
    })

    it('Should be able to search for gym', async () => {
        await gymReository.create({
            title: 'JS Gym',
            description: null,
            phone: null,
            latitude: -22.9604149,
            longitude: -43.3608231
        })

        const { gym } = await sut.execute({
            query: 'JS Gym',
            page: 1
        })

        expect(gym).toHaveLength(1)
        expect(gym).toEqual([
            expect.objectContaining({ title: 'JS Gym'}),
        ])
    })

    it('Should be able to fetch paginated check in history', async () => {
        for( let i = 1; i <= 22; i++){
            await gymReository.create({
                title: `JS Gym ${i}`,
                description: null,
                phone: null,
                latitude: -22.9604149,
                longitude: -43.3608231
            })
        }       

        const { gym } = await sut.execute({
            query: 'JS Gym',
            page: 2
        })

        expect(gym).toHaveLength(2)
        expect(gym).toEqual([
            expect.objectContaining({ title: 'JS Gym 21'}),
            expect.objectContaining({ title: 'JS Gym 22'}),
        ])
    })
})