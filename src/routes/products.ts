import { Router } from 'express'
import { errorHandler } from '../../error-handler'
import { createProduct, deleteProduct, getProductById, listProducts, updateProduct } from '../controllers/products'
import { authMiddleWare } from '../middlewares/auth'
import { adminMiddleWare } from '../middlewares/admin'

const productsRouter: Router = Router()

productsRouter.post('/', authMiddleWare, adminMiddleWare, errorHandler(createProduct))
productsRouter.get('/getAllProducts', authMiddleWare, errorHandler(listProducts))
productsRouter.get('/getProductById/:id', authMiddleWare, errorHandler(getProductById))
productsRouter.post('/getProductById/:id', authMiddleWare, errorHandler(getProductById))
productsRouter.post('/deleteProductById/:id', authMiddleWare, errorHandler(deleteProduct))
productsRouter.post('/updateProductById/:id', authMiddleWare, errorHandler(updateProduct))






export default productsRouter