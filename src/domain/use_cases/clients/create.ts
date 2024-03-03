import {Client2Create} from '../../entities/client'
import {IClientService} from '../../ports/iclient_service'

export class CreateClientUC {
    constructor(private readonly clientService: IClientService) {}

    async execute(newClient: Pick<Client2Create, 'id' | 'limite'>) {
        const {id, limite} = newClient
        const createdClient = await this.clientService.create({
            id,
            limite,
            saldo: 0,
            saldoInicial: 0,
        })
        return createdClient
    }
}
