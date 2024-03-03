export interface Transaction {
    valor: number
    tipo: 'c' | 'd'
    descricao: string
    realizada_em: Date
    id: number
    user_id: number
}

export type Transaction2Create = Pick<
    Transaction,
    'valor' | 'tipo' | 'descricao' | 'realizada_em'
>
