import express from "express"
import { addList, renameList, showLists } from "../controllers/list.controller.js"

const router = express.Router()

router.route("/boards/:boardId/lists")
.get(showLists)
.post(addList)

router.route("/lists/:id")
.put(renameList)

export default router;