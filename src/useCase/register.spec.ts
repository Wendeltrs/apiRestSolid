import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
    it('Should hash user password upon registration', async () => {
        const registerUseCase = new RegisterUseCase({
            async create(data) {
                return {
                    id: 'user-1',
                    nome: data.nome,
                    email: data.email,
                    password_hash: String(data.password_hash),
                    creates_at: new Date()
                }
            },

            async findByEmail(_email) {
                return null
            },
        })

        const { user } = await registerUseCase.execute({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare( //Compara se a senha está sendo criptografada corretamente
            '123456',
            String(user.password_hash)
        )

        expect(isPasswordCorrectlyHashed).toBe(true)
    })
})