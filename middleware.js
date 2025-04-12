const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");

module.exports.isLoggedIn = (req, res, next) => {    
    if (!req.isAuthenticated()) {
        req.flash("error", "Login to add a Review");
        return res.redirect("/login");
    }
    console.log("User authenticated");
    next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;

    try {
        // Attempt to find the review by its ID
        let review = await Review.findById(reviewId);

        // Check if the review exists
        if (!review) {
            req.flash("error", "Review not found");
            return res.redirect(`/places/${id}`); // Redirect back to the place page
        }

        // Check if the logged-in user is the author of the review
        if (!review.author.equals(res.locals.curruser._id)) {
            req.flash("error", "You are not the author of this review");
            return res.redirect(`/places/${id}`); // Redirect back to the place page
        }

        // If the user is the author, allow the request to continue
        next();

    } catch (err) {
        // If any error occurs during review lookup, handle it gracefully
        console.error(err);
        req.flash("error", "Something went wrong while checking the review.");
        return res.redirect(`/places/${id}`);
    }
};

/*const Review = require("./models/review.js");
const ExpressError = require("./utils/ExpressError.js");


module.exports.isLoggedIn = (req, res, next) => {    //console.log("Middleware invoked:", req.path, "..", req.originalUrl);
    if (!req.isAuthenticated()) {
        //req.session.redirectUrl = req.originalUrl;
        //console.log("User not authenticated");
        req.flash("error", "Login to add a Review");
        return res.redirect("/login");
    }
    console.log("User authenticated");
    next();
};

module.exports.isReviewAuthor = async (req,res,next) => {
    let { id,reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.curruser._id)){
        req.flash("error","you are not the author of this review");
        return res.redirect(`/places/${id}`);
    }
    next();
};*/