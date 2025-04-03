//Create Product
const createOrder = async(req, res) =>{
    const {order_id, customer_id, product_list, total_amount} = req.body

    try{
        const product = await Product.create({order_id, customer_id, product_list, total_amount})
        res.status(200).json({success: true, message: product})
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err.message})
    }
}

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

module.exports = { paymentGet, ordersPost };
