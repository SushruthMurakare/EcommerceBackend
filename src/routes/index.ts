import { Router } from 'express'
import authRouter from './auth.ts'
import productsRouter from './products.ts'
import { usersRouter } from './users.ts'


const routeRouter: Router = Router()

routeRouter.use('/auth', authRouter)
routeRouter.use('/products', productsRouter)
routeRouter.use('/address', usersRouter)



export default routeRouter