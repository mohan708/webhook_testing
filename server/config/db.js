
import mongoose from "mongoose";

// function to connect mongodb database



export default async function connectDb(){
    mongoose.connection.on('connected',()=>{
        console.log("Mongodb connected successfully");
    })

    await mongoose.connect(`${process.env.MONGODB_URL}/clerk-auth`)
}
