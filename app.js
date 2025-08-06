const express=require("express");
const app=express();
const mongoose=require("mongoose");
const listing=require("./models/listing.js")
const path=require("path");
const method_override=require("method-override");
const ejs_mate=require("ejs-mate");


main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect('mongodb://127.0.0.1:27017/wonderlust')
};
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(method_override("_method"));
app.engine('ejs',ejs_mate);
 app.use(express.static(path.join(__dirname,"/public")));

app.get("/",(req,res)=>{
    res.send("hii");
});
//index route
app.get("/listings",async (req,res)=>{
   let alllistings= await listing.find({});
       res.render("listings/index.ejs",{alllistings});
});

//new route
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");
});
//create route
app.post("/listings",(req,res)=>{
const newlisting=new listing(req.body);
newlisting.save();
res.redirect("/listings");
});
//edit route
app.get("/listings/:id/edit",async (req,res)=>{
   let {id}=req.params;
   const editlisting =await listing.findById(id);
    res.render("listings/edit.ejs",{listing:editlisting});
});
//update route
app.put("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    await listing.findByIdAndUpdate(id,req.body);
    res.redirect(`/listings/${id}`);
});
//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
   const showlisting=  await listing.findById(id);
   res.render("listings/show.ejs",{listing:showlisting});
});
// delete route
app.delete("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    let deletedlisting=await listing.findByIdAndDelete(id);
    console.log("deleted listing");
    res.redirect("/listings");
});
// app.get("/testlisting",async (req,res)=>{
//   let samplelisting=new listing({
// title:"my home",
// description:"by the neach",
// price:12000,
// country:"india",

//   });
//   await samplelisting.save();
// console.log("sample is save");
// res.send("successful ");
// });


app.listen(8080,()=>{
    console.log("listening");
});