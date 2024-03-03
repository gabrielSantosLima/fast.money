import {IClientService} from '../../ports/iclient_service'

export class FetchAllClientsUC {
    constructor(private readonly clientService: IClientService) {}

    async execute() {
        return this.clientService.fetchAll()
    }
}
