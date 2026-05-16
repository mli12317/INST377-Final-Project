const express = require('express');
const cors = require('cors');
require('dotenv').config();

const artworksRoutes = require('./artworks');
const favoritesRoutes = require('./favorites');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {

    res.json({
        message: 'Interactive Art Explorer API Running'
    });

});

app.use('/api/artworks', artworksRoutes);
app.use('/api/favorites', favoritesRoutes);

module.exports = app;