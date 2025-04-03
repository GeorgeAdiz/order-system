const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Mocked Database (you would replace this with actual DB queries)
let orders = [
  { id: 1, status: 'completed', refund_status: 'pending' },
  { id: 2, status: 'completed', refund_status: 'pending' },
  // Add more mock orders here
];

// Order Cancellation & Refund endpoint
app.put('/orders/:id/cancel', (req, res) => {
  const { id } = req.params;
  const { order_id, reason, refund_status } = req.body;

  // Validate the incoming data
  if (!order_id || !reason || !refund_status) {
    return res.status(400).json({ error: 'Missing required fields: order_id, reason, or refund_status' });
  }

  // Find the order by ID
  const order = orders.find((order) => order.id === parseInt(id));

  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }

  // Update the order's status and refund status
  order.status = 'cancelled';
  order.refund_status = refund_status;

  // Log the cancellation reason (you could save this in a DB or log file)
  console.log(`Order ${order_id} cancelled. Reason: ${reason}`);

  return res.status(200).json({
    message: `Order ${order_id} successfully cancelled.`,
    order,
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
