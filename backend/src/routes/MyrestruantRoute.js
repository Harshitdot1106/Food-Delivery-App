import express, { Router } from "express";
import multer from "multer";
import { jwtCheck, jwtParse } from '../middleware/auth.js';

import {createRestraunt, getMyRestrauntOrders,updatecurrentRestraunt,getRestraunt} from "../Controller/myrestrauntController.js";
import { validateMyrestruant } from "../middleware/validation.js";
import { updatecurrentuser } from "../Controller/MyUserController.js";
const router=Router();
const storage=multer.memoryStorage();
const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024,  //5MB is the limit for uploading
    },
})
router.get(
    "/order",
    jwtCheck,
    jwtParse,
    getMyRestrauntOrders
  );
router.get('/',jwtCheck,jwtParse,getRestraunt)
router.post("/",upload.single("imageFile"),validateMyrestruant,jwtCheck,jwtParse,createRestraunt);
//this upload will check the req body for  type imageFile attribute
router.put("/",upload.single("imageFile"),validateMyrestruant,jwtCheck,jwtParse,updatecurrentRestraunt);
export default router;