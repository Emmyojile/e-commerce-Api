require('dotenv').config();
const express = require('express');
const connectDB = require('./db/connect');
const app = express();
const PORT = process.env.PORT || 5000;
const orderRoute = require('./routes/order')
const cartRoute = require('./routes/cart')
const productRoute = require('./routes/product')
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');

app.use(express.json());



//ROUTES
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/products', productRoute)
app.use('/api/cart', cartRoute)
app.use('/api/order', orderRoute)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`Server listening on port ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}
start()