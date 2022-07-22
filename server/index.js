/**Express Server */
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');
const url = require('url');
const PORT = process.env.PORT || 3000;

//Init express
const app = express();

//Enable cors
app.use(cors());

// Temporarily have routes here
app.get('/api/search/:query', async (req, res) => {
  try {
    // Add api key and query strings
    const params = new URLSearchParams({
      access_token: process.env.API_KEY,
      ...url.parse(req.url, true).query,
    });

    const query = req.params.query;
    const results = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
    );

    const data = results.data;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
