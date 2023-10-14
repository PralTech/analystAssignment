const express = require('express');
const app = express();
const port = 3000;
const axios = require('axios');
const cors = require('cors');

app.use(cors());

// ****** Routing and fetching endpoints ******** 

app.get('/', (req, res) => {
  res.send('Hello, Users!');
});

app.get('/users', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/users');
    const users = response.data;
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

// ******** listening server on port ***** 

app.listen(port, () => {
  console.log(`Server is running on port : ${port}`);
});
