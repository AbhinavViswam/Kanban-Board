import express from "express"
import dotenv from "dotenv"
import cors from "cors"

import { connectDB } from "./db.js";
import boardRouter from "./routes/board.route.js"
import listRouter from "./routes/list.route.js"
import cardRouter from "./routes/card.route.js"

dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use("/api",boardRouter)
app.use("/api",listRouter)
app.use("/api",cardRouter)

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})
