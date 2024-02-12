import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.connect(process.env.MONGO_URI as string)
        .then(() => {
            console.log("MongoDb Connection Successful");
        })
        .catch(err => {
            console.error(err);
        });
};

export default connectDatabase;
