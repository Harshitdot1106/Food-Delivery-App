import {body,validationResult} from "express-validator";
const handlevalidationRequest=async(req,res,next)=>{
const errors=validationResult(req);
if(!errors.isEmpty()){
    return res.status(400).json({errors:"request is not good"});
}
next();
}
export const validateMyUserRequest=[
    body("name").isString().notEmpty().withMessage("Name must be a string"),
   body("address").isString().notEmpty().withMessage("address must be string"),
   body("city").isString().notEmpty().withMessage("City must be string"),
   body("country").isString().notEmpty().withMessage("Country must be a String"),
   handlevalidationRequest
];
export const validateMyrestruant=[
    body("restruantname").isString().notEmpty().withMessage("Name must be a string"),
   body("deliveryprice").isFloat({min:0}).notEmpty().withMessage("price must be string"),
   body("city").isString().notEmpty().withMessage("City must be string"),
   body("country").isString().notEmpty().withMessage("Country must be a String"),
    body("cuisines").isArray().withMessage("the cuisines array should not be empty"),
    body("MenuItems").isArray().withMessage("the cuisines array should not be empty"),
   handlevalidationRequest

]