import express from "express";
import { userRouter } from "./userRouter.js";
import { adminRouter } from "./adminRouter.js";
import { detailImageRouter } from "./detailImageRouter.js";
import { ImageRouter } from "./ImageRouter.js";

export const rootRouter = express.Router()

rootRouter.use("/user", userRouter)

rootRouter.use("/" , adminRouter)

rootRouter.use("/detailImage", detailImageRouter)

rootRouter.use("/image", ImageRouter)