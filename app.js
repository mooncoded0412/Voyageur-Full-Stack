if(process.env.NODE_ENV != 'production'){
require('dotenv').config();
}

const express = require("express");
const mongoose = require("mongoose");

const Listing = require("./models/listing.js");
const path = require("path");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const {reviewSchema} = require("./schema.js");
const methodOverride = require('method-override');

const placeroute = require("./routes/place.js");
const reviewroute = require("./routes/reviewroute.js");
const userroute = require("./routes/user.js");

const review = require("./models/review.js");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const Mongo_URL = "mongodb://127.0.0.1:27017/Voyageur";
const app = express();

async function main() {
    await mongoose.connect(Mongo_URL);
    console.log("Connected to DB");
}

main().catch(err => {
    console.log(err);
});

//middleware used
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(methodOverride('_method'));


const sessionOptions = {
    secret : process.env.SECRET_CODE,
    resave : false,
    saveUninitialized : true,
    cookie :{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true,
    },
};


app.use(session(sessionOptions));
app.use(flash());//flash before routes

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.curruser = req.user;
    next();
})

/*
app.get("/demouser",async (req,res) => {
    let fakeuser = new User({
        email : "abc@gmail.com",
        username :"abc",
    });
    let registereduser = await User.register(fakeuser,"helloworld");
    res.send(registereduser);
})*/

//routes
app.use("/places",placeroute);
app.use("/places/:id/reviews",reviewroute);
app.use("/",userroute);


app.all("*",(req,res,next) => {
    next(new ExpressError(404,"Page Not Found"));
});

//error handler
app.use((err,req,res,next) => {
    let{statuscode=500,message="Something Went Wrong!"} = err;
    res.status(statuscode).send(message);
});

app.get("/", (req, res) => {
    res.send("Hi, I am root");
});

app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});


