const { Order } = require('../models');  

// Create Product
const createOrder = async (req, res) => {
    const { order_id, customer_id, product_list, total_amount } = req.body;

    try {
        const product = await Product.create({ order_id, customer_id, product_list, total_amount });
        res.status(200).json({ success: true, message: product });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: err.message });
    }
};

const paymentGet = async (req, res) => {
    try {
        const paymentDetails = req.body;

        if (!paymentDetails) {
            return res.status(400).json({ message: 'No payment data received' });
        }

        console.log('Payment details:', paymentDetails);

        console.log('Processing payment...');
        res.status(200).json({ message: 'Payment processed successfully' });
    } catch (error) {
        console.error('Error processing payment:', error);
        res.status(500).json({ message: 'Payment processing failed' });
    }
};

const ordersPost = async (req, res) => {
    try {
        const { test, orderDetails } = req.body;

        console.log('Received request body:', req.body);

        if (!test || !orderDetails) {
            return res.status(400).json({ message: 'Missing required fields (test or orderDetails)' });
        }

        console.log('Received order:', test);
        console.log('Order details:', orderDetails);

        res.status(200).json({ message: 'Order created successfully', orderDetails });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Order creation failed' });
    }
};

// Update Delivery Status
const updateDeliveryStatus = async (req, res) => {
    const { id } = req.params; // Get order ID from the URL parameter
    const { current_status } = req.body; // Get the current status from the request body

    if (!current_status) {
        return res.status(400).json({ message: 'Current status is required' });
    }

    try {
        // Find the order by ID and update its status
        const order = await Order.findByPk(id); // Using Sequelize's findByPk method. Adjust this to match your ORM

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.current_status = current_status; // Update the status field

        await order.save(); // Save the updated order

        res.status(200).json({ message: 'Order status updated successfully', order });
    } catch (err) {
        console.error('Error updating delivery status:', err);
        res.status(500).json({ message: 'Failed to update delivery status' });
    }
};

module.exports = { paymentGet, ordersPost, updateDeliveryStatus };
