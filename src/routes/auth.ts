import { Router } from 'express'
import { login, signUp, me } from '../controllers/auth.ts'
import { errorHandler } from '../../error-handler.ts'
import { authMiddleWare } from '../middlewares/auth.js'


const authRouter:Router = Router()

authRouter.post("/login", errorHandler(login))
authRouter.post("/signup", errorHandler(signUp))
authRouter.get("/me", [authMiddleWare], errorHandler(me))



export default authRouter