import {Client, Client2Create, Extract} from '../../domain/entities/client'
import {
    Transaction,
    Transaction2Create,
} from '../../domain/entities/transaction'
import {HttpError} from '../../domain/errors/http_error'
import {IClientService} from '../../domain/ports/iclient_service'
import {pg} from '../../knex'

type ClientTB = Pick<Client, 'id' | 'limite' | 'saldo'>
type TransactionTB = Transaction

const CLIENT_TABLE_NAME = 'clienttb'
const TRANSACTION_TABLE_NAME = 'transactiontb'

export class PGClientService implements IClientService {
    async deleteById(id: number): Promise<void> {
        await pg<TransactionTB>(TRANSACTION_TABLE_NAME)
            .delete()
            .where('user_id', '=', id)
        await pg<ClientTB>(CLIENT_TABLE_NAME).delete().where('id', '=', id)
    }

    async create(newUser: Client2Create): Promise<Client> {
        const createdUser = await pg<ClientTB>(CLIENT_TABLE_NAME)
            .insert(newUser)
            .returning('*')
        if (!createdUser || (createdUser && createdUser.length === 0))
            throw new HttpError('Usuário não foi criado.')
        return createdUser[0]
    }

    async doTransaction(
        id: number,
        newTransaction: Transaction2Create,
        newBalance: number,
    ): Promise<Pick<Client, 'limite' | 'saldo'>> {
        const updatedClientBalance = await pg.transaction(async trx => {
            await trx<TransactionTB>(TRANSACTION_TABLE_NAME).insert({
                ...newTransaction,
                user_id: id,
            })
            await trx<ClientTB>(CLIENT_TABLE_NAME)
                .update({
                    saldo: newBalance,
                })
                .where('id', '=', id)
            const result = await trx<ClientTB>(CLIENT_TABLE_NAME)
                .select('limite', 'saldo')
                .where('id', '=', id)
                .first()
            return result
        })
        if (!updatedClientBalance)
            throw new HttpError('Usuário não existe.', 404)
        return updatedClientBalance
    }

    async getExtract(id: number): Promise<Extract> {
        const client = await this.findById(id)
        if (!client) throw new HttpError('Usário não existe.', 404)
        const ultimas_transacoes =
            await this.fetchLast10TransactionsSortedByDate(id)
        return {
            saldo: {
                limite: client.limite,
                data_extrato: new Date(),
                total: client.saldo,
            },
            ultimas_transacoes,
        }
    }

    async findById(id: number): Promise<Client | null | undefined> {
        const client = await pg<ClientTB>(CLIENT_TABLE_NAME)
            .select('*')
            .where('id', '=', id)
            .first()
        if (!client) return undefined
        return client
    }

    private fetchLast10TransactionsSortedByDate(id: number) {
        return pg<TransactionTB>(TRANSACTION_TABLE_NAME)
            .select('descricao', 'valor', 'realizada_em', 'tipo')
            .where('user_id', '=', id)
            .orderBy('realizada_em', 'desc')
            .limit(10)
    }
}
