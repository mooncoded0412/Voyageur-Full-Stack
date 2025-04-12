const express = require("express");
const router = express.Router({mergeParams : true});
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const review = require("../models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const user = require("../models/user.js");
const {isLoggedIn}= require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");
//const initdata = require("./data.js");
/*
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })*/

const rewviewController = require("../controllers/reviewroute.js")

const validatereview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


// reviews
// review posting
router.post("/",isLoggedIn,validatereview,wrapAsync(rewviewController.addReview));

//delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(rewviewController.destroyReview));

module.exports = router;