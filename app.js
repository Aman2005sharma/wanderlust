const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path=require("path");
const methodOverride=require("method-override");
const listing = require("./models/listing.js");
const ejsMate = require("ejs-mate");

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

app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


//index route
app.get("/listings",async (req,res)=>{
 const allListings=await Listing.find({});
 res.render("listings/index",{allListings});
      
    });

//show route
app.get("/listings/:id",async (req,res)=>{
    let {id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/show.ejs",{listing});
});

//new route
app.get("/listing/new",async (req,res)=>{
    res.render("listings/new.ejs")
})

app.post("/listings", async (req, res) => {
  const newListing = new Listing(req.body.listing);

  // 🔑 IMAGE KO OBJECT BANAO (VERY IMPORTANT)
  newListing.image = {
    url: req.body.listing.image || 
         "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    filename: "default",
  };

  await newListing.save();
  res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit",async (req,res) =>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});


// update route (SAFE VERSION)
app.put("/listings/:id", async (req, res) => {
    let { id } = req.params;

    const listing = await Listing.findById(id);

    // text fields (ye already sahi kaam kar rahe the)
    listing.title = req.body.listing.title;
    listing.description = req.body.listing.description;
    listing.price = req.body.listing.price;
    listing.location = req.body.listing.location;
    listing.country = req.body.listing.country;

    // 🔑 IMAGE SAFE LOGIC (IMPORTANT)
    // sirf tab update karo jab naya image URL aaye
 if (
  req.body.listing.image &&
  req.body.listing.image.url &&
  req.body.listing.image.url.trim() !== ""
) {
  listing.image = {
    url: req.body.listing.image.url,
    filename: "default",
  };
}
    // warna purani image bilkul waise hi rahegi

    await listing.save();
    res.redirect("/listings");
});

//Delete listing
app.delete("/listings/:id", async(req,res)=>{
    let{id}=req.params;
       id = id.trim(); 
    let deletedListing=await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});


app.listen(8080,() =>{
    console.log("Server is listening to port 8080");
});

// app.get("/aman",(req,res)=>{
//     res.send("hi i am root");
// });

// app.get("/testListing", async (req,res)=>{
//     let sampleListing= new Listing({
//         title:"My new villa",
//         description:"By the Beach",
//         price:1200,
//         location:"Calangute,Goa",
//         country:"India",
//     })

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("successful testing");
// });
