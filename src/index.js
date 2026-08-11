require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const ordersRouter = require('./routes/orders');

const app = express();
app.use(express.json());

// Health check
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// Core order management routes
app.use('/orders', ordersRouter);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`OrderFlow API listening on ${port}`));
  })
  .catch((err) => console.error('Failed to connect to MongoDB', err));
