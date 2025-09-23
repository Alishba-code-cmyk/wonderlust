const express=require("express");
const router=express.Router();
const Listing=require("../models/listing.js");
const wrapAsync=require("../utils/wrapAsync.js");// custom wrapAsync

const {isLoggedIn, isOwner,validateListing}=require("../middleware.js");
const listingController= require("../controllers/listings.js");

const multer=require("multer");
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,//validateListing,
  upload.single('listing[image]'),
  wrapAsync (listingController.createListing)
);


//new route
router.get("/new",isLoggedIn,listingController.renderNewForm);


router.route("/:id")
.get(wrapAsync(listingController.showlisting))
.put(isLoggedIn, isOwner,validateListing,
    wrapAsync(listingController.updatelisting))
     .delete(isLoggedIn,isOwner,wrapAsync(listingController.deletelisting));


//index route



//show route


//create route


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.editListing));

//update route




// delete route

module.exports=router;