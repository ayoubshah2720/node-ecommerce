const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const orderRouter = require('./routes/order');
const cartRouter = require('./routes/cart');
dotenv.config()

const app = express();

mongoose.connect(process.env.MONGODB_URL).then(()=>{
    console.log('Database connection Successful......')
}).catch((err)=>{
    console.log(err)
});

app.use(express.json());
app.use('/api',authRouter);
app.use('/api/users',userRouter);
app.use('/api/products',productRouter);
app.use('/api/orders',orderRouter);
// app.use('/api/carts',cartRouter);

app.listen(process.env.PORT || 3000, () =>{
    console.log('BE is running fine.')
})