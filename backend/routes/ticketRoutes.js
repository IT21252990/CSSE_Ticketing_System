const express = require('express');
const router = express.Router();
const Ticket = require('../models/ticketModel');


// Route to add a new ticket
router.post('/add', async (req, res) => {
    try {
        const { userId, startLocation, endLocation, pricePerTicket, ticketQuantity, totalPrice } = req.body;

        const ticket = new Ticket({
            userId, 
            startLocation, 
            endLocation, 
            pricePerTicket, 
            ticketQuantity, 
            totalPrice

        });

        await ticket.save();
        res.status(200).json({ message:'ticket added successfully', ticket });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Route to get all tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


//get one ticket
router.get('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id);
        if (!ticket) {
            return res.status(404).json({ message: 'Ticket not found' });
        }
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//get all tickets of a single user
router.get('/get-user-tickets/:id', async (req, res) => {
    try {
        const tickets = await Ticket.find({userId:req.params.id});
        if (!tickets) {
            return res.status(404).json({ message: 'Passenger not found' });
        }
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;
