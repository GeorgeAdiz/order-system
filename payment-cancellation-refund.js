const express = require('express');

class Order {
    constructor(orderId, amount) {
        this.orderId = orderId;
        this.amount = amount;
        this.status = 'Pending';
    }

    cancelOrder() {
        if (this.status === 'Pending') {
            this.status = 'Cancelled';
            console.log(`Order ${this.orderId} has been cancelled.`);
            return true;
        } else {
            console.log(`Order ${this.orderId} cannot be cancelled. Current status: ${this.status}`);
            return false;
        }
    }

    processRefund() {
        if (this.status === 'Cancelled') {
            console.log(`Refund of $${this.amount} has been processed for order ${this.orderId}.`);
            return true;
        } else {
            console.log(`Refund cannot be processed. Order ${this.orderId} is not cancelled.`);
            return false;
        }
    }
}

// Example usage
const order = new Order(12345, 100.00);
order.cancelOrder();
// Simulating an HTTP PUT request to cancel an order and process a refund
const app = express();
app.use(express.json());

const orders = {
    12345: new Order(12345, 100.00)
};

app.put('/orders/:id/cancel', (req, res) => {
    const orderId = parseInt(req.params.id, 10);
    const { reason, refund_status } = req.body;

    const order = orders[orderId];
    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    if (order.cancelOrder()) {
        if (refund_status === 'process') {
            if (order.processRefund()) {
                return res.status(200).json({ message: `Order ${orderId} cancelled and refund processed.` });
            } else {
                return res.status(400).json({ message: `Order ${orderId} cancelled but refund could not be processed.` });
            }
        }
        return res.status(200).json({ message: `Order ${orderId} cancelled.` });
    } else {
        return res.status(400).json({ message: `Order ${orderId} could not be cancelled.` });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});