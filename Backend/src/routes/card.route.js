import express from "express"
import { createCard, deleteCard, getAllCards, moveCard, updateCard } from "../controllers/card.controller.js";


const router = express.Router()

router.route("/lists/:listId/cards")
.get(getAllCards)
.post(createCard)

router.route("/cards/:id")
.put(updateCard)
.delete(deleteCard)

router.route("/cards/:id/move")
.put(moveCard)

export default router;