async function searchMovies() {
  const title = document.getElementById('title').value;
  const genre = document.getElementById('genre').value;
  const date = document.getElementById('date').value;
  const location = document.getElementById('location').value;

  const res = await fetch(`http://localhost:3000/movies?title=${title}&genre=${genre}&date=${date}&location=${location}`);
  const movies = await res.json();
  const results = document.getElementById('results');

  results.innerHTML = movies.map(m => `
    <div style="border:1px solid #ccc; padding:10px; margin:10px;">
      <h2>${m.title}</h2>
      <p><strong>Genre:</strong> ${m.genre}</p>
      <p><strong>Date:</strong> ${m.date}</p>
      <p><strong>Location:</strong> ${m.location}</p>
      <p><strong>Synopsis:</strong> ${m.synopsis}</p>
      <button onclick="viewDetails('${m._id}')">View Details</button>
    </div>
  `).join('');
}

async function viewDetails(id) {
  const res = await fetch(`http://localhost:3000/movies/${id}`);
  const movie = await res.json();
  console.log("Fetched movie:", movie);
  showBookingForm(movie);
}

function showBookingForm(movie) {
  const results = document.getElementById('results');
  results.innerHTML = `
    <h2>Book Tickets for ${movie.title}</h2>
    <p><strong>Showtimes:</strong></p>
    <select id="showtime">
      ${movie.showtimes.map(time => `<option>${time}</option>`).join('')}
    </select>
    <p><strong>Select Seats:</strong></p>
    <input id="seats" placeholder="e.g. A1,A2">
    <p><strong>Total Tickets:</strong></p>
    <input id="price" type="number" placeholder="e.g. 20">
    <button onclick="submitBooking('${movie._id}')">Confirm Booking</button>
  `;
}

async function submitBooking(movieId) {
  const showtime = document.getElementById('showtime').value;
  const seats = document.getElementById('seats').value.split(',');
  const totalPrice = parseFloat(document.getElementById('price').value);

  const booking = {
    userId: "demoUser123", // Replace with actual user ID if you add login later
    movieId,
    showtime,
    seats,
    totalPrice
  };

  const res = await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });

  const result = await res.json();
  alert(result.message);
}
