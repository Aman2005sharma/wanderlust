// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

// const listingSchema = new Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   description: String,

//  ximage: {
//     url: {
//         type: String,
//         default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
//     },
//     filename: {
//         type: String,
//         default: "default"
//     }
// },

//   price: {
//     type: Number,   // ❗ price should be Number, not String
//     required: true,
//   },

//   location: String,
//   country: String,
// });

// module.exports = mongoose.model("Listing", listingSchema);
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
    url: {
      type: String,
      default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    filename: {
      type: String,
      default: "default",
    },
  },

  price: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },

  location: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    }
  ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing) {

    await Review.deleteMany({_id:{$in:listing.reviews}})

  }
  

})

module.exports = mongoose.model("Listing", listingSchema);