import { strict } from "assert";
import restraunt from "../models/restraunts.models";

const getRestraunt = async (req,res) => {
    try {
      const restaurantId = req.params.restaurantId;
  
      const restaurant = await restraunt.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
  
      res.json(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  };

const searchRestraunt=async(req,res)=>{
    try{
    //https:locaclhost:9000/api/restraunt/search/london(req.params.city)?searchQuery=green+salab(req.query.searchQuery)
const city=req.params.city;
const searchQuery=(req.query.searchQuery ) ||" " ;
const selectedCuisines=(req.query.selectedCuisines) || "";
const sortOption=(req.query.sortOption)||"lastUpdated"
const page=parseInt(req.query.page)|| 1;
let query={

}
query["city"]=new RegExp(city,"i");
const cityCheck= await restraunt.countDocuments(query);
if (cityCheck === 0) {
    return res.status(404).json({
      data: [],
      pagination: {
        total: 0,
        page: 1,
        pages: 1,
      },
    });
  }
  if (selectedCuisines) {
    const cuisinesArray = selectedCuisines
      .split(",")
      .map((cuisine) => new RegExp(cuisine, "i"));

    query["cuisines"] = { $all: cuisinesArray };
  }
  if (searchQuery) {
    const searchRegex = new RegExp(searchQuery, "i");
    query["$or"] = [
      { restaurantName: searchRegex },
      { cuisines: { $in: [searchRegex] } },
    ];
  }

  const pageSize = 10;
  const skip = (page - 1) * pageSize;
  // sortOption = "lastUpdated"
  const restaurants = await restraunt.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await restraunt.countDocuments(query);

    const response = {
      data: restaurants,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    res.json(response);
    }catch(err){
        console.log(err);
        res.status(500).json({message:"Something is not right"})
    }
}
export {
    searchRestraunt,
    getRestraunt
}