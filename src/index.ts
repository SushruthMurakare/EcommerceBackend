import express from 'express'
import type { Express, Request, Response } from 'express';
import { PORT } from './secrets.ts';
import routeRouter from './routes/index.ts';
import { PrismaClient } from '@prisma/client'
import { errorMiddleware } from './middlewares/errors.ts';
import { SignUpSchema } from './schema/users.ts';




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