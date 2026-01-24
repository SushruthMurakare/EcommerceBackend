import { Router } from 'express'
import authRouter from './auth.ts'


const routeRouter: Router = Router()

routeRouter.use('/auth', authRouter)

export default routeRouter