import mongoose from "mongoose";

const listSchema = new mongoose.Schema({
    board_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Board",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    }
},{timestamps:true})

const List = mongoose.model("List",listSchema)
export default List