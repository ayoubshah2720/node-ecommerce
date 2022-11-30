const router = require('express').Router();
const Product = require('../models/ProductModel')

router.get('/products', async (req,res)=>{
    const products = await Product.find();
    try {
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json(error)
    }
});


router.post('/product', async (req,res)=>{
    const productObj = new Product({
        title: req.body.title,
        desc: req.body.desc,
        image: req.body.image,
        categories: req.body.categories,
        size: req.body.size,
        color: req.body.color,
        amount: req.body.amount
    });
    try {
        const saveProduct = await productObj.save()
        res.status(200).json(saveProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete
router.delete('/product:id', async (req,res)=>{
    const id = req.params.id;
    const data = Product.findByIdAndDelete(id)
    try {
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports =  router;