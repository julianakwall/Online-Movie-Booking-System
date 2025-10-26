# Online-Movie-Booking-System
# 🎬 Movie Booking System

A full-stack web application that allows users to search for movies, view details, and book tickets online. Built with a modern tech stack and designed for a smooth, intuitive user experience.

---

## 🚀 Features

- 🔍 Search movies by title, genre, date, and location  
- 📄 View movie details including synopsis, cast, runtime, rating, and showtimes  
- 🎟️ Book tickets by selecting showtime, seats, and total price  
- 🗃️ Store bookings in MongoDB for future retrieval  
- ⚙️ RESTful API built with Express and Mongoose  
- 🎨 Frontend UI built with HTML, CSS, and JavaScript

---

## 🧑‍💻 Technologies Used

- **Frontend**: HTML, CSS, JavaScript  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB, Mongoose  
- **Other Tools**: CORS, Live Server, MongoDB Compass

---

## 📂 Project Structure
movie-booking-system/ 
├── models/ # Mongoose schemas for Movie, Booking, User 
├── public/ # Frontend files (HTML, CSS, JS) 
├── server.js # Express server and API routes 
├── seed.js # Script to seed sample movie data 
├── package.json # Project metadata and dependencies

---

## 🧪 How to Run Locally

1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/movie-booking-system.git
   cd movie-booking-system
2. **Install dependencies**
   npm install
3. **Seed the database**
   node seed.js
4. **Start the server**
   node server.js
5. **Open the frontend**
   Open public/index.html with Live Server or in your browser

📽️ Demo Flow
 -1. Search for a movie using filters
 -2. View detailed information
 -3. Book tickets with showtime, seats, and price
 -4. Confirm booking and view it stored in MongoDB

🛣️ Roadmap
Planned features for the final version:
-👤 User login and registration
-🧾 Booking history and cancellation
-🎯 Seat availability logic
-🛠️ Admin dashboard for managing listings
-🎨 UI polish and animations

