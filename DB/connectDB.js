import mongoose from "mongoose";

const connectDB = async(DATABASE_URL)=>{
    try {
        const DB_OPTION = {
            dbName : 'SayIt'
        };
        await mongoose.connect(DATABASE_URL, DB_OPTION);
        console.log("database connected Succesfully");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;