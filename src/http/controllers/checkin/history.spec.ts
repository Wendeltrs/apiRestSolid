import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";
import { prisma } from "src/lib/prisma";

describe('Check-in History(e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to list the history of checkin', async () => {
        const { token } = await createAndAuthenticateUSer(app)

        const user = await prisma.user.findFirstOrThrow()

        const gymId = await prisma.gym.create({
            data: {
                title: 'JS Gym',
                latitude: -22.9604149,
                longitude: -43.3608231
            }
        })

        await prisma.checkIn.createMany({
            data: [
                {
                    gym_id: gymId.id,
                    user_id: user.id
                },
                {
                    gym_id: gymId.id,
                    user_id: user.id
                }
            ]
        })

        const response = await request(app.server)
            .get('/checkin/history')
            .set('Authorization', `Bearer ${token}`)
            .send()
            
        expect(response.status).toEqual(200)
        expect(response.body.checkin).toEqual([
            expect.objectContaining({
                gym_id: gymId.id,
                user_id: user.id
            }),
            expect.objectContaining({
                gym_id: gymId.id,
                user_id: user.id
            })
        ])
    })
})