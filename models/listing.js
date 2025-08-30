const mongoose=require("mongoose");
const schema=mongoose.Schema;
const listingSchema=new schema({
    title:{
        type:String,
        required:true,},
    description: String,
    image:{
        type:String,
        default: "https://unsplash.com/photos/lighthouse-stands-tall-on-a-rocky-coastline-QdDg2X_2gj0",
        set:(v) =>
             v === ""
         ? "https://unsplash.com/photos/lighthouse-stands-tall-on-a-rocky-coastline-QdDg2X_2gj0"
         :v,
},
    
    price: Number ,
    country:String,
    location:String,
});
const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;
