const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const passport = require("passport");
const user = require("../models/user.js");

module.exports.addReview = async (req, res) => {
    let place = await Listing.findById(req.params.id);
    console.log(req.user);
    // Check if user is authenticated

    
    // Proceed with review creation
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    console.log(newReview);
    place.reviews.push(newReview);
    
    await newReview.save();
    await place.save();
    
    req.flash("success", "Review Added Successfully");
    res.redirect(`/places/${place._id}`);
}

module.exports.destroyReview = async(req,res) => {
    let {id,reviewId} = req.params;
    await Listing.findByIdAndUpdate(id,{$pull : {reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","Review Deleted!");
    res.redirect(`/places/${id}`);
}