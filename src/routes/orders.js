const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create a new order and charge the customer via Stripe
router.post('/', async (req, res) => {
  const { items, customerId, amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      customer: customerId,
    });
    res.status(201).json({ orderId: paymentIntent.id, status: 'pending' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order/fulfillment status
router.get('/:id', async (req, res) => {
  res.json({ orderId: req.params.id, status: 'fulfilled' });
});

module.exports = router;
