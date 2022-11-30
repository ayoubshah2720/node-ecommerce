const router = require('express').Router();
const Order = require('../models/OrderModel')

router.get('/products',(req,res)=>{
    res.send('User test is successful......');
});


router.post('/product', async (req,res)=>{
    const productObj = new Order({
        userId: req.body.userName,
        products: req.body.products,
        amount: req.body.amount,
        // size: req.body.size,
        // color: req.body.color,
        status: req.body.status,
    });
    try{
        const saveProduct = await productObj.save();
        res.status(200).json(saveProduct);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports =  router;