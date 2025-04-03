const express = require('express');
const { paymentGet, ordersPost } = require('./controllers');


const router = express.Router();

router.get('/payments/process', paymentGet);
router.post('/orders/create', ordersPost);

module.exports = router;
