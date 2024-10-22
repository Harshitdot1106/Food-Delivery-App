import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from './routes/myUserRoute.js'
import myrestrauntroute from "./routes/MyrestruantRoute.js";
import mysearchroute from './routes/Restrauntsearch.js'
import {v2 as cloudinary} from 'cloudinary'
import oderRoute from './routes/Order.js'
const  connectDB=async ()=>{
    try{
       await  mongoose.connect(process.env.MONGODB_CONNECTION_STRING )
       console.log("The database is connected");
    }
    catch(err){
console.log("error connection to the data base ",err);
    }
}
const connectCloudinary=()=>{
try{
    cloudinary.config({
        cloud_name:process.env.COUDINARY_CLOUD_NAME,
        api_key:process.env.COUDINARY_API_KEY,
        api_secret:process.env.CLOUDINARY_API_SECRET
        })
}catch(err){
    console.log(err);
}
}
const app=express();

app.use(cors());
app.get("/health",async(req,res)=>{
    res.send("health");
})
app.get("/api/my/user",(req,res)=>{
  res.send("get request");
})
app.use("/api/order/checkput/webhook",express.raw({type:"/*"}));
app.use(express.json());
app.use("/api/my/user",myUserRoute);
app.use("/api/my/restruant",myrestrauntroute);
app.use("/api/restraunt/",mysearchroute);
app.use("/api/order",oderRoute)
app.listen(3000,()=>{
    connectDB();
    connectCloudinary();
    console.log("server started on localhost 3000");
})