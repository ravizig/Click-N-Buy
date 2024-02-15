import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URL);

        console.log(`Conntected To MongoDB Database Host is ${connect.connection.host}`);
    }
    catch (error) {
        console.log((`Error in MongoDB ${error}`));
    }
}

