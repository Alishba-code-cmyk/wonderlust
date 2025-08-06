const mongoose=require("mongoose");
const data=require("./data.js");
const listing=require("../models/listing.js");

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
};
const initDB=async ()=>{
   await listing.deleteMany({});
   await listing.insertMany(data.data);
   console.log("data was initialised");
};
initDB();