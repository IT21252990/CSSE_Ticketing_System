const express = require('express');
const router = express.Router();
const Bus = require('../models/busModel');
const Price = require('../models/busrouteModel');

//bus price route

router.post('/add-route', async (req, res) => {
    try {
        const { start_point, end_point, price } = req.body;

        const route = new Price({  // Use the correct model name here
            start_point,
            end_point,
            price
        });

        await route.save();
        res.status(200).json({ message: 'Route added successfully', route });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
//GET all routes
router.get('/getprice', async (req, res) => {
    try {
        const routes = await Price.find();  // Use the correct model name here
        res.status(200).json(routes);
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a route
router.put('/update-route/:id', async (req, res) => {
    try {
        const { start_point, end_point, price } = req.body;
        const updatedRoute = await Price.findByIdAndUpdate(req.params.id, { start_point, end_point, price }, { new: true });
        res.status(200).json(updatedRoute);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete a route
router.delete('/delete-route/:id', async (req, res) => {
    try {
        await Price.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Route deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


//______________________________________________________________________________________________________


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
        const { busNo, start_route,end_route, driver, conductor,  conductor_username,conductor_password , timePeriods } = req.body;

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
        bus.conductor_username = conductor_username;
        bus.conductor_password = conductor_password;
        bus.timePeriods = timePeriods;

        // Save the updated bus
        await bus.save();

        res.status(200).json({ message: 'Bus updated successfully', bus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});




module.exports = router;
