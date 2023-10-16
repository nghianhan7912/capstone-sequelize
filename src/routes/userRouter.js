import express from "express"
import { postLogin, postRegister, updateUserInfo } from "../controllers/userController.js"
import { lockApi } from "../config/jwt.js"

export const userRouter = express.Router()

userRouter.post("/register" , postRegister)

userRouter.post("/login", postLogin)

userRouter.put("/update",lockApi, updateUserInfo)