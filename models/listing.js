
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review=require("./review.js");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    // url: {
    //   type: String,
    //   default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    // },
    // filename: {
    //   type: String,
    //   default: "default",
    // },
    url:String,
    filename:String
  },

  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  location: String,
  country: String,

  category: {
  type: String,
  enum: ["trending","bedroom","iconic cities","mountains", "beaches", "farms","snow","amazing-pools","hiking","tents"],
},

  latitude: Number,
  longitude: Number,

  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
    
  ],
  owner: {
     type:Schema.Types.ObjectId,
      ref:"User"
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing) {

    await Review.deleteMany({_id:{$in:listing.reviews}})

  }
  

})

module.exports = mongoose.model("Listing", listingSchema);