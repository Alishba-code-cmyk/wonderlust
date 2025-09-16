const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const session=require("express-session");
const flash=require("connect-flash");

const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main(){
    await mongoose.connect(MONGO_URL);
};
app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 app.use(express.static(path.join(__dirname,"/public")));

 const sessionOption={
    secret: "my secret code",
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
       maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
 };

  app.get("/",(req,res)=>{
    res.send("hiii");
});
 app.use(session(sessionOption));
 app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});





app.use("/listings", listings);
app.use("/listings/:id/reviews",reviews);

// app.get("/testlisting",async (req,res)=>{
// let samplelisting=new Listing({
//    title:"my home",
//     description:"nnnnjskaaa",

//     price:1200,
//     country:"india",
//     location:"jaipur",

// });
// await samplelisting.save();
// console.log("sample was save");
// res.send("successful testing");
// });

app.all("*",(req,res,next)=>{
    next(new ExpressError(404,"page not found"));});


app.use((err, req, res, next) => {
     let {statusCode=500, message="something went wrong"}=err;
     res.status(statusCode).render("error.ejs",{message});
    // res.status(statusCode).send(message);
    });
app.listen(5000,()=>{
    console.log("server is listening");
})
