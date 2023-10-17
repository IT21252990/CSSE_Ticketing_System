const express = require('express');
const router = express.Router();
const Bus = require('../models/busModel');


// Route to add a new bus
router.post('/add', async (req, res) => {
    try {
        const { busNo, start_route , end_route, driver, conductor , conductor_username , conductor_password, timePeriods } = req.body;

        const bus = new Bus({
            busNo,
            start_route,
            end_route,
            driver,
            conductor,
            conductor_username,
            conductor_password,
            timePeriods,
            

        });

        await bus.save();
        res.status(200).json({ message: 'Bus added successfully', bus });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all buses
router.get('/', async (req, res) => {
    try {
        const buses = await Bus.find();
        res.status(200).json(buses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



router.get('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }
        res.status(200).json(bus);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
