import express from 'express';
import restraunt from '../models/restraunts.models.js';
import {v2 as cloudinary} from 'cloudinary';
import mongoose from 'mongoose';
import { accessSync } from 'fs';
import Order from "../models/order"
const createRestraunt=async (req,res)=>{
    try{
        const rep=req.body;
        const existingres=await restraunt.findOne({user:req.userId});
        if(existingres){
            return res
            .status(409)
            .json("Already exisiting restraunt");
        }
        // const image=req.file ;
        // const base64Image=Buffer.from(image.buffer).toString("base64");
        // const dataURI=`data${image.mimetype};base64,${base64Image}`;
        // const uploadresponce=await cloudinary.v2.uploader.upload(dataURI);
        // this can be aliter way instead of making a defined function
          const imageUrl=await uploadImage(req.file);
        const restraun =new restraunt(req.body);
        restraun.imageurl=imageUrl;
        restraun.user=new mongoose.Types.ObjectId(req.userId);
        await restraun.save();
        res.status(201).send(restraun);
    }
    catch(err){
        console.log(err);
    }
}
const getRestraunt=async(req,res)=>{
    try{
const r=await restraunt.findOne({user:req.userId});
if(!r){
    return res.status(404).json({message:"restraunt not found"})
}
res.json(r);
    }
    catch(err){
    console.log(err);
    res.status(500).json({message:"Error fetching restraunt"})
    }
}
const updatecurrentRestraunt=async(req,res)=>{
    try{
const restraunt=await restraunt.findOne({user:req.userId});
    
if (!restraunt) {
    return res.status(404).json({ message: "restraunt not found" });
  }

  restraunt.restrauntName = req.body.restrauntName;
  restraunt.city = req.body.city;
  restraunt.country = req.body.country;
  restraunt.deliveryprice = req.body.deliveryprice;
  restraunt.deliverytime = req.body.deliverytime;
  restraunt.cuisines = req.body.cuisines;
  restraunt.menuitems = req.body.menuitems;
  restraunt.lastUpdated = new Date();
if(req.file){
    restraunt.imageurl=await uploadImage(req.file);
}
await restraunt.save();
res.status(200).json("Updated successfully");

    }
    catch(err){
        console.log(err);
    res.status(500).json({message:"Error fetching restraunt"});
    }
    re
}
const uploadImage = async (file) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString("base64");
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
  
    const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);
    return uploadResponse.url;
  };
  const getMyRestrauntOrders = async (req, res) => {
    try {
      const restraun = await restraunt.findOne({ user: req.userId });
      if (!restraun) {
        return res.status(404).json({ message: "restraunt not found" });
      }
  
      const orders = await Order.find({ restraunt: restraun._id })
        .populate("restraunt")
        .populate("user");
  
      res.json(orders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  };
export { 
    createRestraunt,
    getRestraunt,
updatecurrentRestraunt,
getMyRestrauntOrders
}