import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected' , ()=> console.log("database connected"))
        await mongoose.connect(`${process.env.MONGO_URI}/car-rental`)
    } catch (error) {
        console.log(error.massage);
    }
}

export default connectDB ;