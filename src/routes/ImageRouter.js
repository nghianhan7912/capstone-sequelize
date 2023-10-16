import express from "express";
import {  deleteImage, getCreatedImage, getSavedImage, getUserInfo, postImage } from "../controllers/imageController.js";
import { lockApi } from "../config/jwt.js";

export const ImageRouter = express.Router()

ImageRouter.get("/user",lockApi, getUserInfo)

ImageRouter.get("/saved-image/:userId",lockApi, getSavedImage)

ImageRouter.get("/created-image/:userId",lockApi, getCreatedImage)

ImageRouter.delete("/delete-image/:imageId",lockApi, deleteImage)

ImageRouter.post("/",lockApi, postImage)