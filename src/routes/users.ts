
import { Router } from 'express'
import { authMiddleWare } from '../middlewares/auth'
import { adminMiddleWare } from '../middlewares/admin'
import { errorHandler } from '../../error-handler'
import { addAddress, deleteAddress, listAddress } from '../controllers/users'

const usersRouter: Router = Router()

usersRouter.post('/address', [authMiddleWare, adminMiddleWare], errorHandler(addAddress))
usersRouter.delete('/address/:id', [authMiddleWare, adminMiddleWare], errorHandler(deleteAddress))

usersRouter.get('/address', [authMiddleWare, adminMiddleWare], errorHandler(listAddress))
