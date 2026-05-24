const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const {listingSchema}=require("./schema.js");
const ejsMate = require("ejs-mate");
const Review = require("./models/review.js");
const wrapAsync = require("./utils/wrapAsync.js");
// Add this at the top of app.js
const ExpressError = require("./utils/ExpressError.js");
const listings=require("./routes/listing.js");
const reviews=require("./routes/review.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then(()=>{
        console.log("connected to DB");

    })
    .catch((err)=>{
        console.log(err);
    });


async function main() {
    await mongoose.connect(MONGO_URL);
    
}

app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

//Home Route
app.get("/", (req, res) => {
  res.send("Hi i am root");
});



app.use("/listings",listings)
app.use("/listings/:id/reviews",reviews)


app.use((err,req,res,next) =>{
    res.send("something went wrong!")
});


app.listen(8080,() =>{
    console.log("Server is listening to port 8080");
});


