/**Express Server */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//Init express
const app = express();

//Enable cors
app.use(cors());

// Route usage
app.use('/api/search/', require('./routes/searchResults.js'));

// Handle prod env
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(`${__dirname}/public`));
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
