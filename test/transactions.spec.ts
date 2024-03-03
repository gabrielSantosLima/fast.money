import {PGClientService} from '../src/api/services/pg_client_service'
import {Client} from '../src/domain/entities/client'
import {CreateClientUC} from '../src/domain/use_cases/clients/create'
import {DeleteClientUC} from '../src/domain/use_cases/clients/delete_by_id'
import {GetExtractUC} from '../src/domain/use_cases/clients/get_extract'
import {CreateTransactionUC} from '../src/domain/use_cases/transactions/create'

const clientService = new PGClientService()

describe('Transactions (UCs)', () => {
    let createdClient: Client

    beforeAll(async () => {
        const createClientUC = new CreateClientUC(clientService)
        createdClient = await createClientUC.execute({
            id: 6,
            limite: 1000,
        })
    })

    it('Should create a transaction', async () => {
        const createUC = new CreateTransactionUC(clientService)
        const getExtractUC = new GetExtractUC(clientService)

        let updatedClientBalance = await createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'c',
            valor: 1000,
        })
        updatedClientBalance = await createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'd',
            valor: 500,
        })
        const extract = await getExtractUC.execute(createdClient.id)

        expect(updatedClientBalance.limite).toBe(createdClient.limite)
        expect(updatedClientBalance.saldo).toBe(500)
        expect(extract.saldo.total).toBe(updatedClientBalance.saldo)
        expect(extract.saldo.limite).toBe(updatedClientBalance.limite)
    })

    it('Should throw an error on pass an incorrect value to create a transaction', async () => {
        const createUC = new CreateTransactionUC(clientService)
        return expect(
            createUC.execute(createdClient.id, {
                descricao: 'Nice one',
                tipo: 'c',
                valor: -1000,
            }),
        ).rejects.toThrow()
    })

    it('Should throw an error on pass an incorrect type of a transaction', async () => {
        const createUC = new CreateTransactionUC(clientService)
        return expect(
            createUC.execute(createdClient.id, {
                descricao: 'Nice one',
                tipo: 'x',
                valor: -1000,
            }),
        ).rejects.toThrow()
    })

    it('Should throw an error on pass a long description of a transaction', async () => {
        const createUC = new CreateTransactionUC(clientService)
        return expect(
            createUC.execute(createdClient.id, {
                descricao: '12345678910 and more and more',
                tipo: 'c',
                valor: 1000,
            }),
        ).rejects.toThrow()
    })

    afterAll(async () => {
        const deleteClientUC = new DeleteClientUC(clientService)
        await deleteClientUC.execute(createdClient.id)
    })
})
