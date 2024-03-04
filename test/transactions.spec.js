"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const pg_client_service_1 = require("../src/api/services/pg_client_service");
const create_1 = require("../src/domain/use_cases/clients/create");
const delete_by_id_1 = require("../src/domain/use_cases/clients/delete_by_id");
const get_extract_1 = require("../src/domain/use_cases/clients/get_extract");
const create_2 = require("../src/domain/use_cases/transactions/create");
const knex_1 = require("../src/knex");
const clientService = new pg_client_service_1.PGClientService();
describe('Transactions (UCs)', () => {
    let createdClient;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const createClientUC = new create_1.CreateClientUC(clientService);
        createdClient = yield createClientUC.execute({
            id: 7,
            limite: 1000,
        });
    }));
    it('Should create a transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUC = new create_2.CreateTransactionUC(clientService);
        const getExtractUC = new get_extract_1.GetExtractUC(clientService);
        let updatedClientBalance = yield createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'c',
            valor: 1000,
        });
        updatedClientBalance = yield createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'd',
            valor: 500,
        });
        const extract = yield getExtractUC.execute(createdClient.id);
        expect(updatedClientBalance.limite).toBe(createdClient.limite);
        expect(updatedClientBalance.saldo).toBe(500);
        expect(extract.saldo.total).toBe(updatedClientBalance.saldo);
        expect(extract.saldo.limite).toBe(updatedClientBalance.limite);
    }));
    it('Should throw an error on pass an incorrect value to create a transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUC = new create_2.CreateTransactionUC(clientService);
        return expect(createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'c',
            valor: -1000,
        })).rejects.toThrow();
    }));
    it('Should throw an error on pass an incorrect type of a transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUC = new create_2.CreateTransactionUC(clientService);
        return expect(createUC.execute(createdClient.id, {
            descricao: 'Nice one',
            tipo: 'x',
            valor: -1000,
        })).rejects.toThrow();
    }));
    it('Should throw an error on pass a long description of a transaction', () => __awaiter(void 0, void 0, void 0, function* () {
        const createUC = new create_2.CreateTransactionUC(clientService);
        return expect(createUC.execute(createdClient.id, {
            descricao: '12345678910 and more and more',
            tipo: 'c',
            valor: 1000,
        })).rejects.toThrow();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const deleteClientUC = new delete_by_id_1.DeleteClientUC(clientService);
        yield deleteClientUC.execute(createdClient.id);
        yield (0, knex_1.closeConnection)();
    }));
});
