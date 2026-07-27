const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookings");
const { isLoggedIn } = require("../middleware");

router.post(
    "/:listingId",
    isLoggedIn,
    bookingController.createBooking
);


router.get(
    "/",
    isLoggedIn,
    bookingController.bookingHistory
);

module.exports = router;