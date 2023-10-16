import express from "express"
import { getImagesList, getImagesListByName } from "../controllers/adminController.js"

export const adminRouter = express.Router()

adminRouter.get("/get-images-list", getImagesList)

adminRouter.get("/get-images-list-by-name", getImagesListByName)
