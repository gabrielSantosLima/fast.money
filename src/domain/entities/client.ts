import {Transaction} from './transaction'

export interface Client {
    id: number
    limite: number
    saldoInicial: number
    saldo: number
    ultimas_transacoes: Pick<
        Transaction,
        'valor' | 'tipo' | 'descricao' | 'realizada_em'
    >[]
}

export type Client2Create = Pick<
    Client,
    'id' | 'limite' | 'saldo' | 'saldoInicial'
>

export type Extract = Pick<Client, 'ultimas_transacoes'> & {
    saldo: {
        total: number
        data_extrato: Date
        limite: number
    }
}
