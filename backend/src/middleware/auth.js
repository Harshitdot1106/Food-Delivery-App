import {auth } from "express-oauth2-jwt-bearer"
import jwt from 'jsonwebtoken';
import User from "../models/user.models.js";
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256',
  });

  export const jwtParse=async(req,res,next)=>{
    const {authorization}=req.header;
    if(!authorization||!authorization.startsWith("Bearer ")){
        return res.sendStatus(401);
    }
    const token=authorization.split(" ")[1];
    try{
const decoded=jwt.decode(token);
const auth0id=decoded.sub;
const user=User.findByOne({auth0id});
if(!user){
    res.sendStatus(401);
}
req.auth0Id=auth0id;
req.userId=user._id.toString();
next();
    }catch(err){
res.sendStatus(401);
    }
  }