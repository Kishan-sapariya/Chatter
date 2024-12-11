import mongoose from "mongoose";

const connectToDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI)
        console.log("connect to db successfully");
    } catch (error) {
        console.log("Error in connexting to db",error);
    }
}

export default connectToDb;