import { Router } from 'express'
import { login, signUp } from '../controllers/auth.ts'


const authRouter:Router = Router()

authRouter.post("/login", login)
authRouter.post("/signup", signUp)



export default authRouter