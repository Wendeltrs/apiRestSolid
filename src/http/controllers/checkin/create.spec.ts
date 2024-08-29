import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";
import { prisma } from "src/lib/prisma";

describe('Check-in (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to create checkin', async () => {
        const { token } = await createAndAuthenticateUSer(app)

        const gymId = await prisma.gym.create({
            data: {
                title: 'JS Gym',
                latitude: -22.9604149,
                longitude: -43.3608231
            }
        })

        const response = await request(app.server)
            .post(`/gyms/${gymId.id}/checkin`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                gymId: gymId.id,
                latitude: -22.9604149,
                longitude: -43.3608231                
            })
            
        expect(response.status).toEqual(201)
    })
})