const express = require('express');
const axios = require('axios');

const router = express.Router();

// Search artworks
router.get('/search', async (req, res) => {

    try {

        const query = req.query.q;

        const response = await axios.get(
            'https://api.artic.edu/api/v1/artworks/search',
            {
                params: {
                    q: query,
                    fields: 'id,title,artist_display,image_id,date_display'
                }
            }
        );

        const artworks = response.data.data.map(art => ({
            id: art.id,
            title: art.title,
            artist: art.artist_display,
            date: art.date_display,
            image: art.image_id
                ? `https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg`
                : null
        }));

        res.json(artworks);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

});

// Artists route
router.get('/artists', async (req, res) => {

    try {

        const response = await axios.get(
            'https://api.artic.edu/api/v1/agents?limit=1000'
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

});

// Classifications route
router.get('/classifications', async (req, res) => {

    try {

        const response = await axios.get(
            'https://api.artic.edu/api/v1/artworks',
            {
                params: {
                    limit: 300,
                    fields:
                        'id,title,image_id,artist_title,classification_title'
                }
            }
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

});

// Featured artworks route
router.get('/featured', async (req, res) => {

    try {

        const response = await axios.get(
            'https://api.artic.edu/api/v1/artworks?limit=12'
        );

        res.json(response.data);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;