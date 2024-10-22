import express  from "express";
import { jwtCheck,jwtParse } from "../middleware/auth";
import createCheckoutSession from '../Controller/OrderController'
import {stripeWebhookHandler,getMyOrders} from '../Controller/OrderController'
const route=express.Router();
route.get("/",jwtCheck,jwtParse,getMyOrders)
route.post("/checkout/create-checkout-session",jwtCheck,jwtParse,createCheckoutSession);
route.post("/checkout/webhook",stripeWebhookHandler);
export default route;



