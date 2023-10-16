const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 
const Passenger = require('../models/passengerModel');
const bcrypt = require('bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { name , email, Phone , password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email,Phone, password: hashedPassword });
        await user.save();
        res.status(200).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });

        if (user) {
            
            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                res.json({
                    _id: user._id,
                    name:user.name,
                    email: user.email,
                    phone:user.phone
                  });
            } else {
                res.status(401).send('Invalid password');
                console.log('hello')
            }npm 
        } else {
            res.status(401).send('Invalid credentials');
        }
        console.log('hiii')
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// pasenger routes
router.post('/passengersignup', async (req, res) => {
    try {
        const { firstName, lastName, email, Phone, password } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new Passenger({
            firstName,
            lastName,
            email,
            Phone,
            password: hashedPassword
        });

        // Save the user to the database
        await user.save();
        res.status(200).send('User created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.post('/loginpassenger', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const Passenger = await User.findOne({ email });

        if (Passenger) {
            
            const isPasswordValid = await bcrypt.compare(password, Passenger.password);

            if (isPasswordValid) {
                res.json({
                    _id: Passenger._id,
                    firstName:Passenger.firstName,
                    lastName:Passenger.lastName,
                    email: Passenger.email,
                    Phone:Passenger.Phone,
                    password:Passenger.password
                  });
            } else {
                res.status(401).send('Invalid password');
                console.log('hello')
            }npm 
        } else {
            res.status(401).send('Invalid credentials');
        }
        console.log('hiii')
    } catch (error) {
        res.status(400).send(error.message);
    }
});


module.exports = router;