const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
//const { saveRedirectUrl } = require("../middleware.js");
/*
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })*/
const userController = require("../controllers/user.js");

//route is used for the same routes
router.route("/signup")
.get(userController.signupForm)
.post(wrapAsync(userController.signup));
    
router.route("/login")
.get(userController.loginForm)
.post(
    passport.authenticate("local",{
        failureRedirect : "/login",
        failureFlash : true
    }),
 userController.login
);

router.get("/logout",userController.logout)

module.exports = router;
