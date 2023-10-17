const express = require('express');
const router = express.Router();
const BusRoute = require('../models/busrouteModel');


// Route to get all bus routes
router.get('/', async (req, res) => {
    try {
        const routes = await BusRoute.find();
        res.status(200).json(routes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


module.exports = router;
