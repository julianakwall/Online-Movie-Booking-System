const express = require("express");
const router = express.Router();

// Fake payment processor simulation
function processPayment(cardNumber, cvv) {
  if (cardNumber.length === 16 && cvv.length >= 3) {
    return { success: true, transactionId: "TXN" + Date.now() };
  }
  return { success: false };
}

router.post("/process", async (req, res) => {
  const { cardName, cardNumber, expDate, cvv, bookingId, amount } = req.body;

  const paymentResult = processPayment(cardNumber, cvv);

  if (!paymentResult.success) {
    return res.json({ success: false, message: "Payment failed. Try again." });
  }

  // Save payment to DB
  const paymentRecord = {
    bookingId,
    amount,
    transactionId: paymentResult.transactionId,
    status: "Success",
    timestamp: new Date()
  };

  // If using MongoDB:
  // await Payment.create(paymentRecord);

  // If using MySQL:
  // await db.query("INSERT INTO payments SET ?", paymentRecord);

  res.json({
    success: true,
    message: "Payment successful!",
    transactionId: paymentResult.transactionId
  });
});

module.exports = router;
