import express from "express"
import { getImagesList, getImagesListByName } from "../controllers/adminController.js"
import { lockApi } from "../config/jwt.js"

export const adminRouter = express.Router()

adminRouter.get("/get-images-list",lockApi, getImagesList)

adminRouter.get("/get-images-list-by-name",lockApi, getImagesListByName)
