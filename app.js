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

//Create Route
app.post("/listings",async (req,res) =>{
//let{title,description,image,price,country,location}=req.body;
//let listing=req.body.listing;
const newListing = new Listing(req.body.listing);
await newListing.save();
res.redirect("/listings");
});

//Edit route
app.get("/listings/:id/edit",async (req,res) =>{
    let{id}=req.params;
    const listing=await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
});

//update route
app.put("/listings/:id",async(req,res)=>{
 let{id}=req.params;
 await Listing.findByIdAndUpdate(id,{...req.body.listing});
 res.redirect("/listings");
})

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
