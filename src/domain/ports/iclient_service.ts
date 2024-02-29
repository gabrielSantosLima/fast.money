import {Client, Client2Create, Extract} from '../entities/client'
import {Transaction2Create} from '../entities/transaction'

export interface IClientService {
    create(newUser: Client2Create): Promise<Client>
    fetchAll(): Promise<Client[]>
    doTransacton(
        newTransaction: Transaction2Create,
    ): Promise<Pick<Client, 'limite' | 'saldo'>>
    getExtract(id: number): Promise<Extract>
}
