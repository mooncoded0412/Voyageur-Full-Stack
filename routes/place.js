const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");




//controllers
const listingControllers = require("../controllers/place.js");

const validatereview = (req,res,next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
        let errMsg = error.details.map((el) => el.message).join(",");
        throw new ExpressError(400,errMsg);
    }else{
        next();
    }
};


// Index route
router.get("/", wrapAsync(listingControllers.index));


//relatedTerrains
router.get("/relatedplaces/:id", wrapAsync(listingControllers.relatedTerrains));


// Show route carousel
router.get("/:id", wrapAsync(listingControllers.carousel));


//show route
router.get("/relatedplaces/places/:id",wrapAsync(listingControllers.showRoute));


module.exports = router;