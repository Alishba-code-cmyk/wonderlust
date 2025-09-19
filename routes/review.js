const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js");// custom wrapAsync
const ExpressError=require("../utils/ExpressError.js");
const Review=require("../models/review.js");
const Listing=require("../models/listing.js");
const {validateReview, isLoggedIn, isReviewAuthor}=require("../middleware.js")

const reviewcontroller=require("../controllers/reviews.js");

//review route
router.post("/",isLoggedIn,validateReview,
    wrapAsync(reviewcontroller.createreview));
//delete review route
router.delete("/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewcontroller.deletereview));
module.exports=router;