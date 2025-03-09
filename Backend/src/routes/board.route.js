import express from "express"
import { createBoard, getBoard, showBoards } from "../controllers/board.controller.js"
import { addList, renameList, showLists } from "../controllers/list.controller.js"
 
const router = express.Router()

router.route("/boards")
.get(showBoards)
.post(createBoard)

router.route("/boards/:id")
.get(getBoard)

router.route("/boards/:boardId/lists")
.get(showLists)
.post(addList)

router.route("/lists/:id")
.put(renameList)

export default router