/**Express Server */
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

//Init express
const app = express();

//Enable cors
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
