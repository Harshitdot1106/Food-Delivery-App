import User from '../models/user.models.js';
const getCurrentUser=async(req,res)=>{
  try{
const Currentuser=await User.findOne({_id:req.userId});
if(!Currentuser){
  return res.status(404).json("not found")
}
res.json(Currentuser);
  }catch(error){
    console.log(error);
    return res.status(500).json({message:"Something went wrong"});
  }
}
// Function to create a new user
const createCurrentUser = async (req, res) => {
  try {
    const { auth0Id } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ auth0Id });
    if (existingUser) {
      return res.status(200).send("User already exists");
    }

    // Create a new user
    const newUser = new User(req.body);
    await newUser.save();
console.log(newUser);
    // Return the created user
    return res.status(201).json(newUser.toObject());
  } catch (error) {
    // Handle errors
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
};
const updatecurrentuser=async(req,res)=>{
try{
const {name,address,city,country}=req.body;
const user=await User.findById(req.userId);
if(!user){
  return res.status(404).json("not found");
}
user.name=name;
user.address=address;
user.country=country;
user.city=city;
await user.save();

}catch(err){
  console.log(err);
  res.status(500).json({message:"Error updating user"});
}
}
export { 
  getCurrentUser,
  createCurrentUser,
  updatecurrentuser
};
