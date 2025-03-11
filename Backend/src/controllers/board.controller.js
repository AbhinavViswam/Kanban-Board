import Board from "../models/board.model.js";

export const showBoards = async (req, res) => {
    try {
        const boards = await Board.find();
        return res.json({ m: "fetched", boards })
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const createBoard = async (req, res) => {
    try {
        const { title } = req.body
        if (!title) {
            return res.json({ e: "no title provided" })
        }
        const board = new Board({ title });
        await board.save();
        res.status(201).json({ m: "created", board });
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}

export const getBoard = async (req, res) => {
    try {
        const board = await Board.findById(req.params.id);
        if (!board) {
            return res.status(404).json({ e: 'Board not found' });
        }
        res.json({ board });
    } catch (error) {
        return res.json({ e: "internal server error" })
    }
}