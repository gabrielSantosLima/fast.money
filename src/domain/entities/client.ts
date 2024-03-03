import {Transaction} from './transaction'

export interface Client {
    id: number
    limite: number
    saldo: number
}

export type Client2Create = Pick<Client, 'id' | 'limite' | 'saldo'>

export interface Extract {
    saldo: {
        total: number
        data_extrato: Date
        limite: number
    }
    ultimas_transacoes: Pick<
        Transaction,
        'valor' | 'tipo' | 'descricao' | 'realizada_em'
    >[]
}
