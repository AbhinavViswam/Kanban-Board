import express from "express"
import dotenv from "dotenv"

import { connectDB } from "./db/db.js";

dotenv.config();
connectDB();

const app = express()
const port = process.env.PORT

app.listen(port,()=>{
    console.log(`Server running on http://localhost:${port}`);
})