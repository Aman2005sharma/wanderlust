const Review = require("../models/review.js");
const Listing=require("../models/listing.js");

module.exports.createReview=async(req,res)=>{

    try{

        let listing = await Listing.findById(req.params.id.trim());

        let newReview = new Review(req.body.review);
         newReview.author=req.user._id;
        listing.reviews.push(newReview._id);

        await newReview.save();

        await listing.save();

        console.log("new review saved");
        req.flash("success","New Review Added");

        res.redirect(`/listings/${listing._id}`);

    } catch(err){

        console.log(err);

        res.send("something went wrong");
    }
}

module.exports.destroyReview=async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
}