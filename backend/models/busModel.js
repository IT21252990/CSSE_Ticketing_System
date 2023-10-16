const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    busNo: {
        type: String,
        required: true,
    },
    start_route: {
        type: String,
        required: true,
    },
    end_route: {
        type: String,
        required: true,
    },
    driver: {
        type: String,
        required: true,
    },
    conductor: {
        type: String,
        required: true,
    },
    conductor_username: {
        type: String,
        required: true,
    },
    conductor_password: {
        type: String,
        required: true,
    },
    timePeriods: [{
        type: String,
        required: true,
    }],
});

module.exports = mongoose.model('Bus', busSchema);
