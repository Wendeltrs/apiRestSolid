import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";

describe('Create Gym (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create gym', async () => {
        const { token } = await createAndAuthenticateUSer(app)

        const response = await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'JS Gym',
                description: 'Some description',
                phone: '1199999999',
                latitude: -22.9604149,
                longitude: -43.3608231
            })

        expect(response.status).toEqual(201)
    })
})