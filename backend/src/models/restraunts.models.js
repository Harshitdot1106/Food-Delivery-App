import mongoose from 'mongoose'
const menuItemsSchema=new mongoose.Schema({
name:{
    type:String,
    required:true,
    default: () => new mongoose.Types.ObjectId(),
},
price:{
    type:Number,
    required:true
}
});
export const menuItemType=mongoose.model("menuitem",menuItemsSchema)
const restrauntSchema=new mongoose.Schema({
user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
restrauntName:{
    type:String,
    required:true
},
city:{ type:String,
    required:true
},
country:{ type:String,
    required:true
},
deliveryprice:{
    type:Number,
    required:true
},
deliverytime:{ 
    type:Number,
    required:true
},
cuisines:[{
    type:String,
    required:true
}],
menuitems:[menuItemsSchema],
imageurl:{
    type:String,
    required:true
}

},{
    timestamps:true,
})
const restraunt=mongoose.model("Restraunt",restrauntSchema);
export default restraunt