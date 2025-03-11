import Card from "../models/card.model.js"
import List from "../models/list.model.js"

export const getAllCards = async (req, res) => {
    try {
        const list_id = req.params.listId
        const list = await List.findById(list_id)
        if (!list) {
            return res.json({ e: "No list found" })
        }
        const card = await Card.find({ list_id })
        res.json({ card })
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const createCard = async (req, res) => {
    try {
        const list_id = req.params.listId
        const { title, description, position } = req.body
        if (!title || position === undefined) {
            return res.json({ e: "Title and position are required" })
        }
        const list = await List.findById(list_id)
        if (!list) {
            return res.json({ e: "No list found" })
        }
        const newCard = await Card.create({
            list_id,
            title,
            description,
            position
        });

        res.json({ newCard });
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const updateCard = async (req, res) => {
    try {
        const { title, description } = req.body
        const { id } = req.params
        const card = await Card.findByIdAndUpdate(
            id,
            { title, description },
            { new: true }
        );
        if (!card) {
            return res.status(404).json({ error: "Card not found" });
        }
        res.json({ card });
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const deleteCard = async (req, res) => {
    try {
        const id = req.params.id
        await Card.findByIdAndDelete(id)
        res.json({ m: "deleted" })
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const moveCard = async (req, res) => {
    try {
        const { newListId, newPosition } = req.body
        if (!newListId || newPosition === undefined) {
            return res.json({ e: "New list ID and position are required" });
        }
        const listExists = await List.findById(newListId);
        if (!listExists) {
            return res.json({ e: "New list not found" })
        }
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            { list_id: newListId, position: newPosition },
            { new: true }
        );
        if (!updatedCard) {
            return res.json({ e: "Card not found" });
        }

        res.json(updatedCard);
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}