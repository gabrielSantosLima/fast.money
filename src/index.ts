import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import {PORT} from './constants'
import {routes} from './routes'

const app = express()

app.use(express.json())
app.use(
    cors({
        origin: '*',
    }),
)
app.use(routes)
app.listen(PORT)
