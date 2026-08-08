
const express=require("express");
const router=express.Router();
const User=require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport=require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const UserController=require("../controllers/users.js"); 

const Listing = require("../models/listing.js");
const { isLoggedIn } = require("../middleware.js");

router
.route("/signup")
.get(UserController.renderSignupForm)
.post(wrapAsync(UserController.signup));

router
 .route("/login")
 .get(UserController.renderLoginForm)
 .post(
    saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:'/login',
        failureFlash:true
    }),
    UserController.login
);


router.get("/logout",UserController.loguot);

router.post("/wishlist/:id", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(req.user._id);

  if (!user.wishlist.includes(id)) {
    user.wishlist.push(id);
    await user.save();
    req.flash("success", "Added To Wshlist!!");
  }

  res.redirect(req.get("Referrer") || "/listings");
}));

router.post("/wishlist/:id/remove", isLoggedIn, wrapAsync(async (req, res) => {
  const { id } = req.params;

  await User.findByIdAndUpdate(req.user._id, {
    $pull: { wishlist: id }
  });

  req.flash("success", "Removed From Wishlist");
  res.redirect(req.get("Referrer") || "/listings");
}));

router.get("/wishlist", isLoggedIn, wrapAsync(async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  res.render("users/wishlist.ejs", { wishlist: user.wishlist });
}));

module.exports=router;