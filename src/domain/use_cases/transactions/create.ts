import {Transaction2Create} from '../../entities/transaction'
import {HttpError} from '../../errors/http_error'
import {IClientService} from '../../ports/iclient_service'

export class CreateTransactionUC {
    constructor(private readonly clientService: IClientService) {}

    private validateFields(
        newTransaction: Pick<Transaction2Create, 'valor' | 'descricao'> & {
            tipo: string
        },
    ): Transaction2Create {
        const {descricao, tipo, valor} = newTransaction
        if (descricao.length < 1 || descricao.length > 10)
            // Scenario 1: description with wrong length
            throw new HttpError(
                'Descrição precisa ter um tamanho de 1 a 10 caracteres.',
                422,
            )
        if (tipo !== 'c' && tipo !== 'd')
            // Scenario 2: invalid type
            throw new HttpError(
                `Tipo precisa ser 'c' para opção 'crédito' ou 'd' para opção 'débito'.`,
                422,
            )
        // Scenario 2: value is NaN
        if (isNaN(valor))
            throw new HttpError('Valor especificado não é um inteiro.', 422)
        // Scenario 2: value is less than 0
        if (valor <= 0)
            throw new HttpError('Valor não pode ser nulo ou negativo.', 422)
        return {
            descricao,
            tipo,
            valor,
            realizada_em: new Date(),
        }
    }

    private validateTransaction(
        limite: number,
        saldo: number,
        newTransaction: Transaction2Create,
    ) {
        const {tipo, valor} = newTransaction
        let novoSaldo = 0

        if (tipo === 'd') {
            // Retirada de um valor
            novoSaldo = saldo - valor
            if (novoSaldo < -limite)
                throw new HttpError(
                    'Valor de transação maior que o limite aceito.',
                    422,
                )
        } else novoSaldo = saldo + valor // Depósito de um valor
        return novoSaldo
    }

    async execute(
        id: number,
        newTransaction: Pick<Transaction2Create, 'valor' | 'descricao'> & {
            tipo: string
        },
    ) {
        const validatedTransactionPayload = this.validateFields(newTransaction)
        const findClient = await this.clientService.findById(id)
        if (!findClient) throw new HttpError('Usuário não encontrado.', 404)
        const novoSaldo = this.validateTransaction(
            findClient.limite,
            findClient.saldo,
            validatedTransactionPayload,
        )
        const createdTransaction = await this.clientService.doTransaction(
            id,
            validatedTransactionPayload,
            novoSaldo,
        )
        return createdTransaction
    }
}
