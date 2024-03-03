import {Request, Router} from 'express'
import {Transaction2Create} from '../../domain/entities/transaction'
import {GetExtractUC} from '../../domain/use_cases/clients/get_extract'
import {CreateTransactionUC} from '../../domain/use_cases/transactions/create'
import {PGClientService} from '../services/pg_client_service'
import {preventError} from './preventDefault'

export const ClientRoutes = Router()
const clientService = new PGClientService()
const createTransactionUC = new CreateTransactionUC(clientService)
const getExtractUC = new GetExtractUC(clientService)

ClientRoutes.post(
    '/clientes/:id/transacoes',
    (req: Request<{id: number}, unknown, Transaction2Create>, resp) => {
        return preventError(resp, async () => {
            const {id} = req.params
            const data = req.body
            const updateClient = await createTransactionUC.execute(id, data)
            return updateClient
        })
    },
)

ClientRoutes.get(
    '/clientes/:id/extrato',
    (req: Request<{id: number}>, resp) => {
        return preventError(resp, async () => {
            const {id} = req.params
            const extract = await getExtractUC.execute(id)
            return extract
        })
    },
)
