const mongoose = require('mongoose');

const Schema = mongoose.Schema

const ticketSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Passenger',
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
