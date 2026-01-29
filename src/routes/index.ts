import { Router } from 'express'
import authRouter from './auth.ts'
import productsRouter from './products.ts'


const routeRouter: Router = Router()

routeRouter.use('/auth', authRouter)
routeRouter.use('/products', productsRouter)


export default routeRouter