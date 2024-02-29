import {Router} from 'express'
import {FetchAllClientsUC} from '../../domain/use_cases/clients/fetch_all'
import {MemoryClientService} from '../services/memory_client_service'
import {preventError} from './preventDefault'

export const ClientRoutes = Router()
export const clientService = new MemoryClientService()

ClientRoutes.get('/clientes/:id/extrato', (req, resp) => {
    return preventError(resp, async () => {
        const {id} = req.params
        return {}
    })
})

ClientRoutes.get('/clientes', (_, resp) => {
    return preventError(resp, async () => {
        const fetchAllUC = new FetchAllClientsUC(clientService)
        const allClients = await fetchAllUC.execute()
        return allClients
    })
})

ClientRoutes.post('/clientes/:id/transacoes', (req, resp) => {
    return preventError(resp, async () => {
        const {id} = req.params
        return {}
    })
})
