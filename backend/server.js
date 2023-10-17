const express = require('express');
const cors = require("cors")
const dotenv= require('dotenv').config()
const authRouts = require('./routes/authRoutes')
const busRouts = require('./routes/busRouts')
const ticketRouts = require('./routes/ticketRoutes')
const busRouteRouts = require('./routes/routeRoutes')

// Use the singleton database instance
const database = require('./db'); 


const app = express()
const port = process.env.PORT || 8000

app.get("/" , (req,res) => {
    res.send("api is working!")
})

//middleware
app.use(express.json())
app.use(cors())

//routes
app.use('/auth', authRouts);
app.use('/Bus' , busRouts)
app.use('/ticket', ticketRouts);
app.use('/busRoute', busRouteRouts);

app.listen(port , ()=>{
    console.log('server listning on port ' , port)
})