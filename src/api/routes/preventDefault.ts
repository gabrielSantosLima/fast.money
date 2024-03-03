import {Response} from 'express'
import {HttpError} from '../../domain/errors/http_error'

export async function preventError(
    response: Response,
    fn: () => Promise<unknown>,
    successStatus = 200,
) {
    try {
        const result = await fn()
        return response.status(successStatus).json(result)
    } catch (error: unknown) {
        if (error instanceof HttpError) {
            return response.status(error.status).json({
                message: error.message,
                status: error.status,
            })
        }
        return response.status(500).json({
            message: 'Erro do servidor',
            status: 500,
        })
    }
}
