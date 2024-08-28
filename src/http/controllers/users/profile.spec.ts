import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";

describe('Profile (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to get user profile', async () => {
        const { token } = await createAndAuthenticateUSer(app)

        const profileResponse = await request(app.server).get('/me').set('Authorization', `Bearer ${token}`).send()

        expect(profileResponse.status).toEqual(200)
        expect(profileResponse.body.user).toEqual(
            expect.objectContaining({
                email: 'wendel@example.com'
            })
        )
    })
})