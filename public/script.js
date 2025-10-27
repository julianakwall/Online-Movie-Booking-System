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
    <div id="seat-layout" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px;">
      ${generateSeatGrid()}
    </div>

    <p><strong>Total Price:</strong></p>
    <input id="price" type="number" placeholder="e.g. 20">

    <button onclick="submitBooking('${movie._id}')">Confirm Booking</button>
  `;
}

function generateSeatGrid() {
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seats = [];

  for (let row of rows) {
    for (let i = 1; i <= 5; i++) {
      const seatId = `${row}${i}`;
      seats.push(`<div class="seat" id="${seatId}" onclick="toggleSeat('${seatId}')">${seatId}</div>`);
    }
  }

  return seats.join('');
}

let selectedSeats = [];

function toggleSeat(seatId) {
  const seat = document.getElementById(seatId);
  const index = selectedSeats.indexOf(seatId);

  if (index === -1) {
    selectedSeats.push(seatId);
    seat.style.backgroundColor = '#4caf50'; // green
    seat.style.color = 'white';
  } else {
    selectedSeats.splice(index, 1);
    seat.style.backgroundColor = '';
    seat.style.color = '';
  }
}

async function submitBooking(movieId) {
  const showtime = document.getElementById('showtime').value;
  const price = document.getElementById('price').value;

  const booking = {
    movie: movieId,
    showtime,
    seats: selectedSeats,
    price
  };

  const res = await fetch('http://localhost:3000/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking)
  });

  const data = await res.json();
  alert('Booking confirmed!');
  selectedSeats = []; // reset after booking
}


