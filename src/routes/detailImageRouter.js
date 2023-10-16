import express from "express";
import { getCheckImage, getCommentByIdImage, getDetailImage, postCommentImage, saveImage } from "../controllers/detailImageController.js";
import { lockApi } from "../config/jwt.js";

export const detailImageRouter = express.Router()

detailImageRouter.get("/detail-Image/:hinhId" ,lockApi, getDetailImage)

detailImageRouter.get("/comment-Image/:hinhId" ,lockApi, getCommentByIdImage)

detailImageRouter.get("/check-Image/:hinhId" ,lockApi, getCheckImage)

detailImageRouter.post("/save-image/:idImage",lockApi,saveImage)

detailImageRouter.post("/post-comment-Image/:hinhId" ,lockApi, postCommentImage)

