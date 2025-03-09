import mongoose from "mongoose"

export const connectDB = () => {
    mongoose.connect(process.env.DB_URI).then(()=>{
        console.log("Database connection successfull");
    }).catch((err)=>{
        throw new Error(err)
    })
}