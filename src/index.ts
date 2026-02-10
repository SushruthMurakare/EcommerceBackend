import express from 'express'
import type { Express, Request, Response } from 'express';
import { PORT } from './secrets';
import routeRouter from './routes/index';
import { PrismaClient } from '@prisma/client'
import { errorMiddleware } from './middlewares/errors';
import { SignUpSchema } from './schema/users';




const app: Express = express()
app.use(express.json());
app.use('/', routeRouter)
app.use(errorMiddleware)

export const prisma = new PrismaClient({
  log: ["query"], // optional
})

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`)
})