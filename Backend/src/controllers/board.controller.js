import Board from "../models/board.model.js";

export const showBoards = async(req,res) => {
    const boards = await Board.find();
    return res.json({m:"fetched",boards})
}

export const createBoard = async(req,res) => {
    const {title} = req.body
    if(!title){
        return res.json({e:"no title provided"})
    }
    const board = new Board({title});
    await board.save();
    res.status(201).json({m:"created",board});
}

export const getBoard = async(req,res) => {
    const board = await Board.findById(req.params.id);
    if (!board){
        return res.status(404).json({e: 'Board not found'});
    }
    res.json({board});
}