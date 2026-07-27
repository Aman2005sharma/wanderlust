
const Booking = require("../models/booking");
const Listing = require("../models/listing");

module.exports.createBooking = async (req, res) => {
    const { listingId } = req.params;

    const listing = await Listing.findById(listingId);

    if (!listing) {
        req.flash("error", "Listing not found");
        return res.redirect("/listings");
    }

    const booking = new Booking({
        user: req.user._id,
        listing: listing._id,
        checkIn: new Date(),
        checkOut: new Date(),
        guests: 1,
        totalPrice: listing.price,
    });

    await booking.save();

    req.flash("success", "Booking Successful!");

    res.redirect("/bookings");
};

// ==========================
// Booking History
// ==========================
module.exports.bookingHistory = async (req, res) => {

    const bookings = await Booking.find({
        user: req.user._id
    }).populate("listing");

    res.render("bookings/index.ejs", { bookings });

};