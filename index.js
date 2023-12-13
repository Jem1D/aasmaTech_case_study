// imports
const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Passing the public assets directly to the server
app.use(express.static('public'));

// Website entry point
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// endpoint fetched from the frontend
app.get('/repositories', async (req, res) => {
  try {
    const perPage = req.query.perPage || 10; // default to 10 repositories per page
    const apiUrl = `https://api.github.com/search/repositories?q=created:2019-01-10&sort=stars&order=desc&per_page=${perPage}`;
    
    // requesting response from the api url using Axios
    const response = await axios.get(apiUrl);
    const repositories = response.data.items;

    res.json(repositories);
  } catch (error) { // Error handling
    console.error('Error fetching GitHub repositories:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Starting server on port specified earlier; 3000
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
