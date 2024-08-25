import { CheckinRepository } from "src/repositories/checkin-repository";

interface GetUserMetricsUseCaseRequest{
    userId: string
}
interface GetUserMetricsUseCaseResponse{
    checkinCount: number
}

export class GetUserMetricsUseCase{
    constructor(private checkinRepository: CheckinRepository){}

    async execute({ userId }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse>{
        const checkinCount = await this.checkinRepository.countByUserId(userId)

        return { checkinCount }
    }
}