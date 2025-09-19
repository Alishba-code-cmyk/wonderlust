
const User=require("../models/user.js");
module.exports.rendersignup=(req,res)=>{
    res.render("users/signup.ejs");
};

module.exports.signup=async(req,res)=>{
    try{
    let {username,email,password}=req.body;
let   newUser=new User({email,username});
const registredUser=await User.register(newUser,password);
console.log(registredUser);
req.login(registredUser,(err)=>{
    if(err){
        return next(err);
    }
    req.flash("success","welcome to wanderlust");
res.redirect("/listings");
     })  
    }
    catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");

    }
};
module.exports.renderlogin=(req,res)=>{
    res.render("users/login.ejs");
};
module.exports.login=async(req,res)=>{
req.flash("success","welcom back to wanderlust");
let redirectUrl=res.locals.redirectUrl||"/listings";
res.redirect(redirectUrl);
};
module.exports.logout=(req,res,next)=>{
    req.logout((err)=>{
        if(err){
          return   next(err);}
            req.flash("success","you are logged out");
            res.redirect("/listings");
    })
};