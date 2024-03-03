import {Client, Client2Create, Extract} from '../entities/client'
import {Transaction2Create} from '../entities/transaction'

export interface IClientService {
    create(newUser: Client2Create): Promise<Client>
    doTransaction(
        id: number,
        newTransaction: Transaction2Create,
        newBalance: number,
    ): Promise<Pick<Client, 'limite' | 'saldo'>>
    getExtract(id: number): Promise<Extract>
    findById(id: number): Promise<Client | undefined | null>
    deleteById(id: number): Promise<void>
}
