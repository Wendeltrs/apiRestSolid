import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "src/repositories/checkin-repository";

interface FetchUsersCheckinsHistoryUseCaseRequest{
    userId: string,
    page: number
}
interface FetchUsersCheckinsHistoryUseCaseResponse{
    checkin: CheckIn[]
}

export class FetchUsersCheckinsHistoryUseCase{
    constructor(private checkinRepository: CheckinRepository){}

    async execute({ userId, page }: FetchUsersCheckinsHistoryUseCaseRequest): Promise<FetchUsersCheckinsHistoryUseCaseResponse>{
        const checkin = await this.checkinRepository.findManyByUserId(userId, page)

        return { checkin }
    }
}