import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymRepository } from 'src/repositories/in-memory/in-memory-gym-repository'
import { FetchNearbyGymsUseCaseCase } from './fetch-nearby-gyms'

let gymReository: InMemoryGymRepository
let sut: FetchNearbyGymsUseCaseCase

describe('Fetch Nearby Gyms Use Case', () => {
    beforeEach(async () => {
        gymReository = new InMemoryGymRepository()
        sut = new FetchNearbyGymsUseCaseCase(gymReository)
    })

    it('Should be able to fetch nearby gym', async () => { 
        await gymReository.create({
            title: 'Near Gym',
            description: null,
            phone: null,
            latitude: -22.9604149,
            longitude: -43.3608231
        })

        await gymReository.create({
            title: 'Far Gym',
            description: null,
            phone: null,
            latitude: -22.7470659,
            longitude: -42.8436831
        })

        const { gym } = await sut.execute({
            userLatitude: -22.9604149,
            userLongitude: -43.3608231
        })

        expect(gym).toHaveLength(1)
        expect(gym).toEqual([ expect.objectContaining({ title: 'Near Gym'}) ])
    })

    it.skip('Should be able to fetch paginated check in history', async () => {
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