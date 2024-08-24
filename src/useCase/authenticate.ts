import { User } from "@prisma/client";
import { UserRepository } from "src/repositories/users-repository";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";
import { compare } from "bcryptjs";

interface AuthenticateUseCaseRequest{
    email: string,
    password: string
}
interface AuthenticateUseCaseResponse{
    user: User
}
export class AuthenticateUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({ email, password }:AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse>{
        const user = await this.userRepository.findByEmail(email)

        if(!user){
            throw new InvalidCredentialsError()
        }

        const doesPasswordMatches = await compare(password, String(user.password_hash))

        if(!doesPasswordMatches){
            throw new InvalidCredentialsError()
        }

        return { user }
    }
}