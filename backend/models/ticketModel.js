const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    startLocation: {
        type: String,
        required: true,
    },
    endLocation: {
        type: String,
        required: true,
    },
    pricePerTicket: {
        type: Number,
        required: true,
    },
    ticketQuantity: {
        type: Number,
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);
