const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderID: {
        type: String, 
        required: true,
        unique: true
    },
    customerID: {
        type: String,
        required: true
    },
    productlist: {
        type: String,
        required: true
    },
    totalamount: {
        type: Number,
        required: true
    },
    orderid, reason: {
        type: Number,
        required: true
    },
    refund_status: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);