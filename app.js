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
const { Session } = require("inspector");
const flash=require("connect-flash");
const passport=require("passport");
const LocalStrategy=require("passport-local");
// const User=require("./models/review.js");
// const user = require("./models/user.js");
const User = require("./models/user.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


const sessionOptions={
    secret:"mysupersecretcode",
    resave:false,
    saveUninitialized: true
};

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
    next();
});

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/",userRouter)

app.use((err,req,res,next) =>{
    res.send("something went wrong!")
});


app.listen(8080,() =>{
    console.log("Server is listening to port 8080");
});


