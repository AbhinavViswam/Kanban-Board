import express from "express"
import { createBoard, getBoard, showBoards } from "../controllers/board.controller.js"
 
const router = express.Router()

router.route("/boards")
.get(showBoards)
.post(createBoard)

router.route("/boards/:id")
.get(getBoard)

export default router