const express = require('express');
const cors = require('cors');

require('dotenv').config();

const artworksRoutes = require('./artworks');
const favoritesRoutes = require('./favorites');

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static('public'));

app.use('/api/artworks', artworksRoutes);

app.use('/api/favorites', favoritesRoutes);

app.get('/', (req, res) => {

    res.redirect('/home_page.html');

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});