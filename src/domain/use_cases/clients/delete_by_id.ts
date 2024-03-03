import {IClientService} from '../../ports/iclient_service'

export class DeleteClientUC {
    constructor(private readonly clientService: IClientService) {}

    async execute(id: number) {
        await this.clientService.deleteById(id)
    }
}
