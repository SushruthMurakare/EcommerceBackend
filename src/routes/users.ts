
import { Router } from 'express'
import { authMiddleWare } from '../middlewares/auth'
import { adminMiddleWare } from '../middlewares/admin'
import { errorHandler } from '../../error-handler'
import { addAddress, deleteAddress, listAddress, updateUser } from '../controllers/users'

export const usersRouter: Router = Router()

usersRouter.post('/addAddress', authMiddleWare, errorHandler(addAddress))
usersRouter.post('/delete/:id', authMiddleWare, adminMiddleWare, errorHandler(deleteAddress))

usersRouter.get('/getAllAddress', authMiddleWare, errorHandler(listAddress))
usersRouter.put('/updateAddress', authMiddleWare, errorHandler(updateUser))

