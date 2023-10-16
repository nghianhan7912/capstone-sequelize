import express from "express"
import cors from "cors"
import { rootRouter } from "./routes/rootRouter.js"
const app = express()

app.use(express.json())
app.use(cors(["http://localhost:3000"]))
app.listen(9000)
app.use("/api", rootRouter)