const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    orderID: {
        type: String, 
        required: true,
        unique: true
    },
    paymentmethod: {
        type: String,
        required: true
    },
    transactionID: {
        type: String,
        required: true
    },
    invoice_pdf_link: {
        type: Number,
        required: true
    },
    current_status: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
