const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/repositories', async (req, res) => {
  try {
    const perPage = req.query.perPage || 10; // default to 10 repositories per page
    const apiUrl = `https://api.github.com/search/repositories?q=created:2019-01-10&sort=stars&order=desc&per_page=${perPage}`;
    
    const response = await axios.get(apiUrl);
    const repositories = response.data.items;

    res.json(repositories);
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
