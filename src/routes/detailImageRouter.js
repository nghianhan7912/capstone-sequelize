import express from "express";
import { getCheckImage, getCommentByIdImage, getDetailImage, postCommentImage, saveImage } from "../controllers/detailImageController.js";

export const detailImageRouter = express.Router()

detailImageRouter.get("/detail-Image/:hinhId" , getDetailImage)

detailImageRouter.get("/comment-Image/:hinhId" , getCommentByIdImage)

detailImageRouter.get("/check-Image/:hinhId" , getCheckImage)

detailImageRouter.post("/save-image/:idImage",saveImage)

detailImageRouter.post("/post-comment-Image/:hinhId" , postCommentImage)

