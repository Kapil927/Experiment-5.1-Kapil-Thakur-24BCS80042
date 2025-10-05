const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/api');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Database connected successfully'))
  .catch((err) => console.log('❌ DB Connection Error:', err));

// Use Node's Promise
mongoose.Promise = global.Promise;

// Middleware for headers (same as Todo app)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(bodyParser.json());

// API routes
app.use('/api', routes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err);
  next();
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
