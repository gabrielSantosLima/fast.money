import {Router} from 'express'
import {ClientRoutes} from './api/routes/clients'

export const routes = Router()

routes.use(ClientRoutes)
