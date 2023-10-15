const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 
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
            }
        } else {
            res.status(401).send('Invalid credentials');
        }
        console.log('hiii')
    } catch (error) {
        res.status(400).send(error.message);
    }
});

module.exports = router;