import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";
import { createAndAuthenticateUSer } from "src/utlis/test/create-and-authenticate-user";
import { prisma } from "src/lib/prisma";

describe('Check-in Validate(e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to validate a checkin', async () => {
        const { token } = await createAndAuthenticateUSer(app, true)

        const user = await prisma.user.findFirstOrThrow()

        const gymId = await prisma.gym.create({
            data: {
                title: 'JS Gym',
                latitude: -22.9604149,
                longitude: -43.3608231
            }
        })

        let checkin = await prisma.checkIn.create({
            data: {
                gym_id: gymId.id,
                user_id: user.id
            }
        })

        const response = await request(app.server)
            .patch(`/checkin/${checkin.id}/validate`)
            .set('Authorization', `Bearer ${token}`)
            .send()
            
        expect(response.status).toEqual(204)

        checkin = await prisma.checkIn.findUniqueOrThrow({
            where: {
                id: checkin.id
            }
        })

        expect(checkin.validated_at).toEqual(expect.any(Date))
    })
})