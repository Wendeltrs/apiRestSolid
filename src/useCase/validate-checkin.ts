import { CheckIn } from "@prisma/client";
import { CheckinRepository } from "src/repositories/checkin-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface ValidateCheckinUseCaseRequest{
    checkinId: string
}
interface ValidateCheckinUseCaseResponse{
    checkin: CheckIn
}

export class ValidateCheckinUseCase{
    constructor( private checkinRepository: CheckinRepository ){}

    async execute({ checkinId }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse>{
        const checkin = await this.checkinRepository.findById(checkinId)

        if(!checkin) throw new ResourceNotFoundError()

        checkin.validated_at = new Date()

        await this.checkinRepository.save(checkin)

        return { checkin }
    }
}