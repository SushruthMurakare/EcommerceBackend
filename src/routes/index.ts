import { Router } from 'express'
import authRouter from './auth'
import productsRouter from './products'
import { usersRouter } from './users'


const routeRouter: Router = Router()

routeRouter.use('/auth', authRouter)
routeRouter.use('/products', productsRouter)
routeRouter.use('/address', usersRouter)



export default routeRouter