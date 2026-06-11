const express=require("express");
const router=express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing=require("../models/listing.js");
const listingController=require("../controllers/listings.js");
const {isLoggedIn,isOwner,validateListing}=require("../middleware.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });


router
.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,  upload.single('listing[image]'),wrapAsync (listingController.createListing));



    
    //new route
router.get("/new",isLoggedIn,listingController.renderNewForm);



// show route
router.get("/:id", listingController.showListing);


// //create route
//    router.post("/",isLoggedIn, validateListing, wrapAsync (listingController.createListing));

//Edit route
router.get("/:id/edit",isLoggedIn,isOwner,listingController.renderEditForm);



// update route
router.put("/:id", isLoggedIn,isOwner,upload.single('listing[image]'), listingController.updateListing);

//Delete listing
router.delete("/:id",isLoggedIn,listingController.destroyListing);

module.exports=router;

