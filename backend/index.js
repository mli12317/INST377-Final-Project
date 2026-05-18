const express = require('express');
const cors = require('cors');
require('dotenv').config();

const artworksRoutes = require('./artworks');
const favoritesRoutes = require('./favorites');

const app = express();

app.use(cors());
app.use(express.json());


app.use(express.static('public'));

app.get('/', (req, res) => {

    res.sendFile(__dirname + '/public/index.html');

});

app.use('/api/artworks', artworksRoutes);
app.use('/api/favorites', favoritesRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});