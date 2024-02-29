import {Client, Client2Create, Extract} from '../../domain/entities/client'
import {
    Transaction,
    Transaction2Create,
} from '../../domain/entities/transaction'
import {HttpError} from '../../domain/errors/http_error'
import {IClientService} from '../../domain/ports/iclient_service'

export class MemoryClientService implements IClientService {
    static clients: Client[] = []
    static transactions: Transaction[] = []

    async create(newUser: Client2Create): Promise<Client> {
        const {id, limite} = newUser
        const findClient = MemoryClientService.clients.find(c => c.id === id)
        if (findClient) return findClient
        const createdClient: Client = {
            id,
            limite,
            saldo: 0,
            saldoInicial: 0,
            ultimas_transacoes: [],
        }
        MemoryClientService.clients = [
            ...MemoryClientService.clients,
            createdClient,
        ]
        return createdClient
    }

    async fetchAll(): Promise<Client[]> {
        return MemoryClientService.clients
    }

    async doTransacton(
        newTransaction: Transaction2Create,
    ): Promise<Pick<Client, 'limite' | 'saldo'>> {
        return {
            limite: 0,
            saldo: 0,
        }
    }

    async getExtract(id: number): Promise<Extract> {
        const findClient = MemoryClientService.clients.find(c => c.id === id)
        if (!findClient) throw new HttpError('Usuário não encontrado.', 404)
        return {
            saldo: {
                data_extrato: new Date(),
                limite: findClient.limite,
                total: findClient.saldo,
            },
            ultimas_transacoes: MemoryClientService.transactions.filter(
                t => t.userId === id,
            ),
        }
    }
}
