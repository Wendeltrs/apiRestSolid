import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";

describe('Refresh Token (e2e', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to refresh a token', async () => {
        await request(app.server).post('/users').send({
            nome: 'Wendel Tavares',
            email: 'wendel@example.com',
            password: '123456'
        })

        const authResponse = await request(app.server).post('/sessions').send({
            email: 'wendel@example.com',
            password: '123456'
        })

        const cookies = authResponse.get('Set-Cookie')

        if(!cookies) throw new Error('Algo deu errado')

        const response = await request(app.server)
            .patch('/token/refresh')
            .set('Cookie', cookies)
            .send()

        expect(response.status).toEqual(200)
        expect(response.body).toEqual({
            token: expect.any(String)
        })
        expect(response.get('Set-Cookie')).toEqual([
            expect.stringContaining('refreshToken=')
        ])
    })
})