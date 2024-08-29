import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from 'supertest'
import { app } from "../../../app";

describe('Register (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })
    afterAll(async () => {
        await app.close()
    })

    it('Should be able to register', async () => {
        const response = await request(app.server).post('/users').send({
            nome: 'Wendel Tavares',
            email: 'wendel@example.com',
            password: '123456'
        })

        expect(response.status).toEqual(201)
    })
})