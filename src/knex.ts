import knex from 'knex'
import {DB_URL} from './constants'

export const pg = knex({
    client: 'pg',
    connection: DB_URL,
    searchPath: ['knex', 'public'],
})

export async function closeConnection() {
    await pg.destroy()
}
