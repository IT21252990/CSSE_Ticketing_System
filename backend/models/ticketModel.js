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
        type: String,
        required: true,
    },
    ticketQuantity: {
        type: String,
        required: true,
    },
    totalPrice: {
        type: String,
        required: true,
    },
},{timestamps: true});

module.exports = mongoose.model('Ticket', ticketSchema);
