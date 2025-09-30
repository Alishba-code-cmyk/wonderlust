if(process.env.NODE_ENV!="production"){
    require("dotenv").config();
};



const express=require("express");
const app=express();
const mongoose=require("mongoose");
const path=require("path");
const methodOverride=require("method-override");
const ejsMate=require("ejs-mate");
const ExpressError=require("./utils/ExpressError.js");
//const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const DBURL=process.env.ATLASDB_URL;
const session=require("express-session");
const mongoStore=require("connect-mongo");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
const User=require("./models/user.js");

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");
const { error } = require("console");

main().then(()=>{
    console.log("connected to db");
})
.catch((err)=>{
    console.log(err);
});
async function main() {
    await mongoose.connect(DBURL);
};


app.engine('ejs',ejsMate);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
 app.use(express.static(path.join(__dirname,"/public")));

 const store=mongoStore.create({
    mongoUrl: DBURL,
   crypto:{
  secret: process.env.SECRET,
   },
touchAfter: 24* 3600
});

store.on("error",(err)=>{
    console.log("error in mongo db",err);
});

 const sessionOption={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie:{
        expires: Date.now()+7*24*60*60*1000,
       maxAge: 7*24*60*60*1000,
        httpOnly: true,
    },
 };


 app.use(session(sessionOption));
 app.use(flash());

 app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser= req.user;
  next();
});

// app.get("/demouser",async(req,res)=>{
// let fakeuser=new User({
//     email: "student@gmail.com",
//     username: "delta-student"
// });
// let  registredUser=await User.register(fakeuser,"helloworld");
// res.send(registredUser);
// })



app.use("/listings", listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

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
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`✅ Server is listening on port ${port}`);
});

