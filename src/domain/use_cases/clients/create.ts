import {IClientService} from '../../ports/iclient_service'

export class CreateClientUC {
    constructor(private readonly clientService: IClientService) {}

    async execute() {}
}
