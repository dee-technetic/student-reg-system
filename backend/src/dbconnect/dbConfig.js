
import mongoose from 'mongoose';


export const dbConnect  =  async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log('MongoDB Connected...' .bgGreen);
    } catch (error) {
        console.error(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
};


