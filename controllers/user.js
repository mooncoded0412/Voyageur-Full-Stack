const User = require("../models/user.js");

module.exports.signup = async (req,res) => {
    try{
    let {username,email,password} = req.body;
    const newUser = new User({email,username});
    const registeredUser = await  User.register(newUser,password);
    console.log(registeredUser);
    req.login(registeredUser,(err) => {
       if(err){
        return next(err);
       }
    req.flash("success","welcome to Voyageur");
    res.redirect("/places");
    });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.signupForm = (req,res) => {
    res.render("users/signup.ejs");
}

module.exports.loginForm = async (req,res) => {
    res.render("users/login.ejs");
 }

 module.exports.login = async(req,res) => {
    req.flash("success","welcome back to Voyageur");
  // let redirectUrl = res.locals.redirectUrl;
   res.redirect("/places");
}

module.exports.logout = (req,res,next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success","you are Logged Out now");
        res.redirect("/places");
    });
}