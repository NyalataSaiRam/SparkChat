import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI,);
        console.log('connected to MongoDB');
    }
    catch (error) {
        console.log("error connecting to mongoDb", error);
    }
};

export default connectToMongoDB;