# 🏡 Wanderlust

A full-stack travel accommodation platform inspired by modern
stay-booking platforms, built using Node.js, Express, MongoDB and EJS.

## 🌐 Live Demo

🔗 **Live Website:** [View Live Demo](https://wanderlust-epyl.onrender.com/)
🔗 **GitHub Repository:** [View on GitHub](https://github.com/Aman2005sharma/wanderlust)

## ✨ Features
### 👤 User Authentication
- User registration and login
- Passport.js authentication
- Session-based authentication
- Logout functionality
- Protected routes for authenticated users

### 🏡 Listing Management
- Create new property listings
- Edit existing listings
- Delete listings
- Upload property images
- Cloudinary image storage
- Listing categories
- Location and country information
- Price management

### 🔍 Search & Discovery
- Search listings by:
  - Title
  - Location
  - Country
  - Category
- Category-based filtering
- Responsive listing cards
- Empty-search state handling

### ❤️ Wishlist
- Add listings to wishlist
- Remove listings from wishlist
- View saved listings
- User-specific wishlist storage

### ⭐ Reviews & Ratings
- Add reviews to listings
- Star-based ratings
- Display review authors
- Delete your own reviews
- Review validation

### 📅 Booking System
- Book available listings
- Select check-in and check-out dates
- Specify number of guests
- View booking history
- Store booking information in MongoDB

### 🗺️ Location & Maps
- Location-based coordinates
- Interactive map integration
- Automatic geocoding of listing locations

### 🎨 Responsive UI
- Responsive design for desktop and mobile
- Bootstrap-based components
- Custom CSS styling
- Modern listing and authentication pages
- Responsive navigation

### 🛡️ Validation & Error Handling
- Joi request validation
- Mongoose schema validation
- Custom Express errors
- Async error handling
- Flash messages for user feedback
- Protected owner and review-author routes

### 🐳 Docker Support
- Docker configuration for containerized deployment
- Environment variables for sensitive configuration

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- EJS
- Font Awesome

### Backend
- Node.js
- Express.js
- EJS-Mate
- Mongoose
- Passport.js
- Passport Local
- Joi
  
### Database & Storage
- MongoDB Atlas
- Cloudinary

### APIs & Services
- OpenStreetMap / Nominatim for geocoding
- Map integration

### Tools
- Git
- GitHub
- Docker
- VS Code


  ## 🏗️ Project Architecture

The application follows a structured MVC-style architecture.

```text
Browser
   │
   ▼
Routes
   │
   ▼
Controllers
   │
   ▼
Models
   │
   ▼
MongoDB
```

## ⚙️ Getting Started
### Prerequisites

Make sure you have:

- Node.js
- npm
- MongoDB Atlas account
- Cloudinary account
- Required API credentials

1. Clone the repository
git clone https://github.com/Aman2005sharma/wanderlust.git
cd Wanderlust

3. Install dependencies
npm install

4. Create environment variables
Create a .env file in the project roo
Atlas_Url=
SECRET=
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
MAP_API_KEY=

5. Start the application
For development:
node app.js
Or:
npm start
The application runs on:
http://localhost:8080

🐳 Running with Docker
Build the Docker image:
docker build -t wanderlust .
Run the container:
docker run -p 8080:8080 --env-file .env wanderlust
Then open:
http://localhost:8080

## 🔐 Security & Validation

- Passport.js authentication
- Protected routes for authenticated users
- Listing owner authorization
- Review author authorization
- Joi request validation
- Mongoose schema validation
- Environment variables for sensitive credentials
- `.env` excluded from Git
- Cloudinary for image uploads

## 📸 Screenshots

### Home Page
![Home Page](screenshots/home.png)

### Listing Details
![Listing Details](screenshots/listing-details.png)

### Login
![Login](screenshots/login.png)

### Booking History
![Booking History](screenshots/booking.png)

### Wishlist
![Wishlist](screenshots/wishlist.png)

## 🔮 Future Improvements
- 💳 Payment integration
- ❌ Booking cancellation
- 📧 Email confirmation
- 🏠 Host dashboard
- 🛠️ Admin dashboard
- 📅 Advanced availability management
- 🧪 Automated testing

## 👨‍💻 Author

**Aman Sharma**

GitHub: https://github.com/Aman2005sharma
LinkedIn: https://www.linkedin.com/in/aman-sharma-6bbb6a353
