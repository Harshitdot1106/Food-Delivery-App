import  Stripe from "stripe" ;
import Order from "../models/order";

import { menuItemType } from "../models/restraunts.models";
import restraunt from "../models/restraunts.models";
const STRIPE= new Stripe(process.env.STRIPE_API_KEY)
const FRONTEND_URL=process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const getMyOrders = async (req,res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .populate("restaurant")
      .populate("user");

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
const stripeWebhookHandler = async (req, res) => {
  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig ,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";

    await order.save();
  }

  res.status(200).send();
};
const createCheckoutSession=async(req,res)=>{
    try{
      const checkoutSessionrequest=req.body;
      const restraun=await restraunt.findOne(
        checkoutSessionrequest.restrauntId
      );
      if(!restraun){
        return res.json("Invalid Details")
      };
      const newOrder = new Order({
        restaurant: restraun,
        user: req.userId,
        status: "placed",
        deliveryDetails: checkoutSessionrequest.deliveryDetails,
        cartItems: checkoutSessionrequest.cartItems,
        createdAt: new Date(),
      });
  
      const lineItems=createLineItems(checkoutSessionrequest,restraun.menuitems);
      const session=await createSession(lineItems,newOrder._id.toString(),restraun.deliveryprice,restraun._id.toString());
      if(!session.url){
        return res.status(500).json({message:"Error creating stripe session"});
      }
      await newOrder.save();
      res.json({url:session.url});
    }
catch(err){
   console.log(err);
   res.status(500).json({message:err.raw.message})     
    }
}
const createLineItems=(checkoutSessionrequest,menuitems)=>{
const ListItems=checkoutSessionrequest.cartItems.map((cartItem)=>{
    const menuItem=menuitems.find(
        (item)=>item._id.toString()===cartItem.menuItemId.toString()
    );
    if(!menuItem){
        throw new Error(`Menu item not found:${cartItem.menuItemId}`)
    }
    const line_item = {
      price_data: {
        currency: "gbp",
        unit_amount: menuItem.price,
        product_data: {
          name: menuItem.name,
        },
      },
      quantity: parseInt(cartItem.quantity),
    };

    return line_item;
  });
} 
const createSession = async (
  lineItems,orderId,deliveryPrice,restaurantId) => {
  const sessionData = await STRIPE.checkout.sessions.create({
    line_items: lineItems,
    shipping_options: [
      {
        shipping_rate_data: {
          display_name: "Delivery",
          type: "fixed_amount",
          fixed_amount: {
            amount: deliveryPrice,
            currency: "gbp",
          },
        },
      },
    ],
    mode: "payment",
    metadata: {
      orderId,
      restaurantId,
    },
    success_url: `${FRONTEND_URL}/order-status?success=true`,
    cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`,
  });

  return sessionData;
};

export default {
  getMyOrders,
  createCheckoutSession,
  stripeWebhookHandler,
};