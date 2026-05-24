const express=require("express");
const router=express.Router();
const {listingSchema}=require("../schema.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Listing=require("../models/listing.js");


const validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);

    if (error) {
        let errMsg = error.details.map((el) => el.message).join(",");

        throw new ExpressError(400, errMsg);

    } else {
        next();
    }
};


//index route
router.get("/",async (req,res)=>{
 const allListings=await Listing.find({});
 res.render("listings/index",{allListings});
      
    });
    
    //new route
router.get("/new",async (req,res)=>{
    res.render("listings/new.ejs")
})


//show route
router.get("/:id", async(req,res)=>{

    try{

        let {id} = req.params;

        const listing = await Listing.findById(id).populate("reviews");

        if(!listing){
            return res.send("Listing not found");
        }

        res.render("listings/show.ejs",{listing});

    } catch(err){

        console.log(err);

        res.send(err.message);
    }
});



//create route
   router.post("/", validateListing, wrapAsync ( async (req, res , next) => {
    try{
        const newListing = new Listing(req.body.listing);

  newListing.image = {
    url: req.body.listing.image ||
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    filename: "default",
  };

  await newListing.save();
  res.redirect("/listings"); 
    } catch(err){
        next(err);
    }
}));

//Edit route
router.get("/:id/edit",async (req,res) =>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


// update route (SAFE VERSION)
router.put("/:id", async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    // text fields (ye already sahi kaam kar rahe the)
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // 🔑 IMAGE SAFE LOGIC (FIXED VERSION)
if (
  req.body.listing.image &&
  req.body.listing.image.url &&
  req.body.listing.image.url.trim() !== ""
) {
  listing.image = {
    url: req.body.listing.image.url.trim(),
    filename: "default",
  };
}
    // warna purani image bilkul waise hi rahegi

    await listing.save();
    res.redirect("/listings");
});

//Delete listing
router.delete("/:id", async(req,res)=>{
    let{id}=req.params;
       id = id.trim(); 
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

module.exports=router;

