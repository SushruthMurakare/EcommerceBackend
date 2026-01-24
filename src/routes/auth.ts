import { Router } from 'express'
import { login } from '../controllers/auth.ts'


const authRouter:Router = Router()

authRouter.get("/login", login)


export default authRouter