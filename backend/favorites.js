const express = require('express');
const supabase = require('./supabase');

const router = express.Router();

router.get('/', async (req, res) => {

    try {

        const { data, error } = await supabase
            .from('favorites')
            .select('*');

        if (error) throw error;

        res.json(data);

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

router.post('/', async (req, res) => {

    try {

        const {
            artwork_id,
            title,
            artist,
            image_url
        } = req.body;

        const { data, error } = await supabase
            .from('favorites')
            .insert([
                {
                    artwork_id,
                    title,
                    artist,
                    image_url
                }
            ]);

        if (error) throw error;

        res.json({
            message: 'Favorite added successfully',
            data
        });

    } catch (error) {

        res.status(500).json({
            error: error.message
        });

    }

});

module.exports = router;