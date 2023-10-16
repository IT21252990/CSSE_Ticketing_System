const express = require('express');
const router = express.Router();
const Bus = require('../models/busModel');

router.get('/statistics', async (req, res) => {
    try {
        const totalBuses = await Bus.countDocuments();
        
        const buses = await Bus.find();
        let totalPeriods = 0;
        buses.forEach(bus => {
            totalPeriods += bus.timePeriods.length;
        });
        const averageTimePeriods = totalPeriods / totalBuses;

        res.status(200).json({ totalBuses, averageTimePeriods });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

// Fetch the bus routes from the database
router.get('/bus-routes', async (req, res) => {
    try {
      const routes = await Bus.find({}, 'start_route end_route');
      res.json(routes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
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

router.delete('/:id', async (req, res) => {
    try {
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        await Bus.deleteOne({ _id: req.params.id });

        res.status(200).json({ message: 'Bus deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { busNo, start_route,end_route, driver, conductor, timePeriods } = req.body;

        // Find the bus by ID
        const bus = await Bus.findById(req.params.id);
        if (!bus) {
            return res.status(404).json({ message: 'Bus not found' });
        }

        // Update bus properties
        bus.busNo = busNo;
        bus.start_route = start_route;
        bus.end_route = end_route;
        bus.driver = driver;
        bus.conductor = conductor;
        bus.timePeriods = timePeriods;

        // Save the updated bus
        await bus.save();

        res.status(200).json({ message: 'Bus updated successfully', bus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/statistics', async (req, res) => {
    try {
        const totalBuses = await Bus.countDocuments();
        
        const buses = await Bus.find();
        let totalPeriods = 0;
        buses.forEach(bus => {
            totalPeriods += bus.timePeriods.length;
        });
        const averageTimePeriods = totalPeriods / totalBuses;

        res.status(200).json({ totalBuses, averageTimePeriods });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
