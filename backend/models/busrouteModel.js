const mongoose = require('mongoose');

const routeSchema = new mongoose.Schema({
    start_point: { type: String, required: true },
    end_point: { type: String, required: true },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Route', routeSchema);
