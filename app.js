if(process.env.NODE_ENV !="production"){
    require('dotenv').config();
}


// console.log(process.env.MAP_API_KEY);


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

const listingRouter=require("./routes/listing.js");
const reviewRouter=require("./routes/review.js");
const userRouter=require("./routes/user.js");

const session=require("express-session");
const MongoStore = require("connect-mongo").default;
const { Session } = require("inspector");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
// const User=require("./models/review.js");
// const user = require("./models/user.js");
const User = require("./models/user.js");

// const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";
const dbUrl = process.env.Atlas_Url;

const store=MongoStore.create({
    mongoUrl:dbUrl,
    crypto:{
        secret:process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error",(err)=>{
    console.log("ERROR IN MONGO SESSION STORE",err);
});

const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized: true,
    cookie:{
        expires:Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// console.log("DB URL:", dbUrl);
main()
    .then(()=>{
        console.log("connected to DB");

    })
    .catch((err)=>{
        console.log(err);
    });


async function main() {
    console.log("Atlas URL:", process.env.Atlas_Url);
    await mongoose.connect(dbUrl);
    
}

app.use(express.static(path.join(__dirname,"/public")));
app.set("view engine","ejs")
app.set("views", path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);



// app.get("/demouser",async(req,res)=>{
//     let fakeUser=new User({
//         email:"amansharma@gmail.com",
//         username:"aman_sharma"
//     });
//    let registeredUser= await User.register(fakeUser,"helloworld");
//    res.send(registeredUser);
// });

app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
      res.locals.error=req.flash("error");
      res.locals.currUser=req.user;

       res.locals.MAP_API_KEY = process.env.MAP_API_KEY;
    next();
});

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

app.use((err,req,res,next) =>{
     console.log(err);
    res.send(err.message);
    // res.send("something went wrong!")
});


app.listen(8080,() =>{
    console.log("Server is listening to port 8080");
});


