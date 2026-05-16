const express = require('express');
const axios = require('axios');

const router = express.Router();

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

        res.status(500).json({
            error: 'Failed to fetch artworks'
        });

    }

});

module.exports = router;