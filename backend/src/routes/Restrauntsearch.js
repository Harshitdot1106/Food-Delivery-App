import express from "express";
import { param } from "express-validator";
import {searchRestraunt ,getRestraunt} from '../Controller/SearchController'
const router =express.Router();
router.get("/search/:city",param("city").isString().trim().notEmpty().withMessage("Must be a string"),searchRestraunt);
router.get("/search/:city",param("city").isString().trim().notEmpty().withMessage("Must be a string"),getRestraunt);

export default router;
