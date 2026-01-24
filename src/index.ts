import express from 'express'
import type { Express, Request, Response } from 'express';
import { PORT } from './secrets.ts';
import routeRouter from './routes/index.ts';

const app: Express = express()

app.use('/', routeRouter)


app.listen(PORT, () => {
    console.log("App running...")
})