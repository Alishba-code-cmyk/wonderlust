const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");// custom wrapAsync

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController= require("../controllers/listings.js");

//index route
router.get("/",wrapAsync(listingController.index));


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);



//show route
router.get("/:id",wrapAsync(listingController.showlisting));

//create route
router.post("/",isLoggedIn,validateListing,
    wrapAsync (listingController.createListing)
);

//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

//update route
router.put("/:id",
  isLoggedIn,
  isOwner
  ,validateListing,
    wrapAsync(listingController.updatelisting));



// delete route
router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));

module.exports=router;