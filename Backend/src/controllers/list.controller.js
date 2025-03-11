import List from "../models/list.model.js";
import Board from "../models/board.model.js";

export const addList = async (req, res) => {
    try {
        const { title } = req.body
        const board_id = req.params.boardId
        if (!title) {
            return res.status(400).json({ e: 'title is required' });
        }
        const board = await Board.findById(board_id)
        if (!board) {
            return res.json({ e: "Board does not exist" })
        }
        const lastList = await List.findOne({ board_id }).sort({ position: -1 });
        const position = lastList ? lastList.position + 1 : 0;
        const list = new List({ board_id, title, position });
        await list.save();
        res.json({ m: "created", list });
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const showLists = async (req, res) => {
    try {
        const board_id = req.params.boardId
        const board = await Board.findById(board_id)
        if (!board) {
            return res.json({ e: "Board does not exist" })
        }
        const list = await List.find({ board_id }).sort("position")
        if (!list) {
            return res.json({ e: "No list exists" })
        }
        res.json({ list })
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const renameList = async (req, res) => {
    try {
        const { title } = req.body
        const { id } = req.params
        if (!title) {
            return res.status(400).json({ e: 'title is required' });
        }
        const list = await List.findByIdAndUpdate(id, { title }, { new: true })
        if (!list) {
            return res.json({ e: "no list found" })
        }
        res.json({ list })
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}