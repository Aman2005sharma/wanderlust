const Listing=require("../models/listing");
const axios = require("axios");

module.exports.index = async (req, res) => {
  const { category } = req.query;

  let allListings;

  if (category) {
    allListings = await Listing.find({ category: category });
  } else {
    allListings = await Listing.find({});
  }

  res.render("listings/index.ejs", { allListings });
};

 module.exports.renderNewForm = (req,res)=>{
    res.render("listings/new.ejs");
   };

  module.exports.showListing=async (req, res) => {
    try {
        let { id } = req.params;
        id = id.trim();

        const listing = await Listing.findById(id)
            .populate({path:"reviews",
                populate:{
                    path:"author",
                },
     })
            .populate("owner");

        if (!listing) {
            req.flash("error", "Listing not found");
            return res.redirect("/listings");
        }

        res.render("listings/show.ejs", { listing });

    } catch (err) {
        console.log(err);
        req.flash("error", "Invalid listing ID");
        res.redirect("/listings");
    }
    };

   module.exports.createListing = async (req, res, next) => {
  try {
    const newListing = new Listing(req.body.listing);

    const address = `${newListing.location}, ${newListing.country}`;

const response = await axios.get(
  `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
  {
    headers: {
      "User-Agent": "WanderLust-App"
    }
  }
);
if (response.data.length > 0) {
  newListing.latitude = parseFloat(response.data[0].lat);
  newListing.longitude = parseFloat(response.data[0].lon);
}

    newListing.owner = req.user._id;

    if (req.file) {
      let url = req.file.path;
      let filename = req.file.filename;
      newListing.image = { url, filename };
    }
if (response.data.length > 0) {
  newListing.latitude = parseFloat(response.data[0].lat);
  newListing.longitude = parseFloat(response.data[0].lon);
}


console.log("LAT:", newListing.latitude);
console.log("LNG:", newListing.longitude);
console.log(response.data);



    await newListing.save();

    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  } catch (err) {
    next(err);
  }
};

    module.exports.renderEditForm=async (req,res) =>{
        let{id}=req.params;
        const listing=await Listing.findById(id);
       
        let originalImageUrl = listing.image.url;
      originalImageUrl = originalImageUrl.replace("/upload","/upload/e_blur:300,h_300,w_250");
        res.render("listings/edit.ejs",{listing,originalImageUrl});
    };

    module.exports.updateListing=async (req, res) => {
       let { id } = req.params;
    
      let listing= await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if( typeof req.file !=="undefined"){ 
       let url = req.file.path;
      let filename = req.file.filename;
      listing.image= { url, filename };
      await listing.save();
       }
      req.flash("success", "Listing Updated");
      res.redirect(`/listings/${id}`);
    };

    module.exports.destroyListing=async(req,res)=>{
        let{id}=req.params;
         
        let deletedListing=await Listing.findByIdAndDelete(id);
        req.flash("success"," Listing Deleted");
        console.log(deletedListing);
        res.redirect("/listings");
    };