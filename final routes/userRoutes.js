const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Booking = require("../models/Booking");
const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({ name, email, password: hashed });
    res.json({ success: true, message: "User registered!", user });
  } catch (err) {
    res.json({ success: false, message: "Email already exists" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.json({ success: false, message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.json({ success: false, message: "Incorrect password" });

  res.json({
    success: true,
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email
    }
  });
});

// GET USER BOOKINGS
router.get("/:userId/bookings", async (req, res) => {
  const bookings = await Booking.find({ userId: req.params.userId });
  res.json(bookings);
});

module.exports = router;
