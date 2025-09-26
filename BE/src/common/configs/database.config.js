import mongoose from "mongoose";
import {DB_URI} from "./environment.config.js";

const connectDB = async ()=>{
    try{
        const connected =  await mongoose.connect(DB_URI);
        console.log(`
            Connect Mongoose: mongodb:/${connected.connection.host}:${connected.connection.port}/${connected.connection.name}`
        );
    }catch(error){
        console.log(`Error: ${error}`);
        process.exit(1);
    }
}

export default connectDB;