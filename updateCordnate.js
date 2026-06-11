const mongoose = require("mongoose");
const Listing = require("./models/listing");
const axios = require("axios");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

async function main() {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to DB");
}

async function updateListings() {
  const listings = await Listing.find({
    latitude: { $exists: false }
  });

  for (let listing of listings) {
    const address = `${listing.location}, ${listing.country}`;

    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`,
      {
        headers: {
          "User-Agent": "WanderLust-App"
        }
      }
    );

    if (response.data.length > 0) {
      listing.latitude = parseFloat(response.data[0].lat);
      listing.longitude = parseFloat(response.data[0].lon);

      await listing.save();

      console.log(`Updated: ${listing.title}`);
    }
  }

  console.log("All listings updated!");
  mongoose.connection.close();
}

main()
  .then(() => updateListings())
  .catch(console.error);