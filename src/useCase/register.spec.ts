import { describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

describe('Register Use Case', () => {
    it('Should be able to register', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const { user } = await registerUseCase.execute({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

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

    it('Should not be able to register with same email twice', async () => {
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)

        const email = 'wendel@oiiiexemplo.com'

        await registerUseCase.execute({
            nome: 'Wendel Tavares',
            email,
            password: '123456'
        })        

        await expect(() => 
            registerUseCase.execute({
                nome: 'Wendel Tavares',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})