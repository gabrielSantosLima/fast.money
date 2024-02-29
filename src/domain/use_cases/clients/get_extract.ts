import {IClientService} from '../../ports/iclient_service'

export class GetExtractUC {
    constructor(private readonly clientService: IClientService) {}

    async execute() {}
}
