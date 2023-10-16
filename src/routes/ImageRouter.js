import express from "express";
import {  deleteImage, getCreatedImage, getSavedImage, getUserInfo, postImage } from "../controllers/imageController.js";

export const ImageRouter = express.Router()

ImageRouter.get("/user", getUserInfo)

ImageRouter.get("/saved-image/:userId", getSavedImage)

ImageRouter.get("/created-image/:userId", getCreatedImage)

ImageRouter.delete("/delete-image/:imageId", deleteImage)

ImageRouter.post("/", postImage)