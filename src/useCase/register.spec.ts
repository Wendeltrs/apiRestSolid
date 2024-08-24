import { beforeEach, describe, expect, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from 'src/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('Should be able to register', async () => {
        const { user } = await sut.execute({
            nome: 'Wendel Tavares',
            email: 'wendel@oiiexemplo.com',
            password: '123456'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should hash user password upon registration', async () => {
        const { user } = await sut.execute({
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
        const email = 'wendel@oiiiexemplo.com'

        await sut.execute({
            nome: 'Wendel Tavares',
            email,
            password: '123456'
        })        

        await expect(() => 
            sut.execute({
                nome: 'Wendel Tavares',
                email,
                password: '123456'
            })
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
    })
})