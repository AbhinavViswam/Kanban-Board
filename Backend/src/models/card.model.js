import mongoose from "mongoose";

const cardSchema = new mongoose.Schema({
    list_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"List",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    position:{
        type:Number,
        required:true
    },
    
},{timestamps:true})

const Card = mongoose.model("Card",cardSchema)
export default Card