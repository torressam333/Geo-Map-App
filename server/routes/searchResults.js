const express = require('express');
const router = express.Router();
const axios = require('axios');
const url = require('url');

router.get('/:query', async (req, res) => {
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

    // Add logic to be able to set values for location info
    results.data.features.forEach((feature) => {
      feature.city = null;
      feature.state = null;
      feature.country = null;
      feature.zip = null;

      // Loop through feature results context
      feature.context.forEach((type) => {
        if (type.id.includes('place')) feature.city = type.text;
        if (type.id.includes('region')) feature.state = type.text;
        if (type.id.includes('country')) feature.country = type.text;
        if (type.id.includes('postcode')) feature.zip = type.text;
      });
    });

    const data = results.data;

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
