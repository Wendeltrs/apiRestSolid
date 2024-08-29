import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to search gym by title', async () => {
        const { token } = await createAndAuthenticateUSer(app, true)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JS Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -22.9604149,
                longitude: -43.3608231
            })

        await request(app.server)
        .post('/gyms')
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: 'TS Gym',
            description: 'Some description',
            phone: '1199999999',
            latitude: -22.9604149,
            longitude: -43.3608231
        })

        const response = await request(app.server)
            .get('/gyms/search')
            .query({
                q: 'JS'
            })
            .set('Authorization', `Bearer ${token}`)
            .send()
        
        expect(response.status).toEqual(200)
        expect(response.body.gym).toHaveLength(1)
        expect(response.body.gym).toEqual([
            expect.objectContaining({
                title: 'JS Gym'
            })
        ])
    })
})