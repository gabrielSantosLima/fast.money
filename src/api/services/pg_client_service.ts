import {Client, Client2Create, Extract} from '../../domain/entities/client'
import {Transaction2Create} from '../../domain/entities/transaction'
import {IClientService} from '../../domain/ports/iclient_service'

export class PGClientService implements IClientService {
    async deleteById(id: number): Promise<Client> {
        throw new Error('Method not implemented.')
    }

    async create(newUser: Client2Create): Promise<Client> {
        throw new Error('Method not implemented.')
    }

    async fetchAll(): Promise<Client[]> {
        throw new Error('Method not implemented.')
    }

    async doTransaction(
        id: number,
        newTransaction: Transaction2Create,
        newBalance: number,
    ): Promise<Pick<Client, 'limite' | 'saldo'>> {
        throw new Error('Method not implemented.')
    }

    async getExtract(id: number): Promise<Extract> {
        throw new Error('Method not implemented.')
    }

    async findById(id: number): Promise<Client | null | undefined> {
        throw new Error('Method not implemented.')
    }
}
