const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const Review=require("./review.js");
const { required } = require("joi");
const listingSchema=new Schema({
    title:{
        type:String,
        required:true,},
    description: String,
    image:{
       url: String,
       filename: String,
},
    
    price: Number ,
    country:String,
    location:String,
    
  // ✅ New field for coordinates
  geometry: {
    type: {
      type: String,
      enum: ["Point"], // GeoJSON "Point"
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
  category:{
type: [Number],
enum: ["mountains","arctic","farms","deserts"],
  },
    reviews:[
        {
            type: Schema.Types.ObjectId,
ref: "Review",
        },
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
listingSchema.post("findOneAndDelete",async (listing)=>{
    if(listing){
await Review.deleteMany({_id: {$in: listing.reviews}});

}
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
