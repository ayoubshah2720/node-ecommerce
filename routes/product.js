const ProductModel = require('../models/ProductModel');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
//Create Product
router.post('/', async (req,res) => {
    // router.post('/',verifyTokenAndAdmin, async (req,res) => {
    const productObj = new ProductModel(req.body)
    try {
        const saveProduct = await productObj.save();
        res.status(200).json(saveProduct)
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Product
router.put('/:id', async (req, res) => {
    try {
        const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateProduct)

    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete Product
router.delete('/:id', async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get Product
router.get('/:id', async (req, res) => {
    try {
        const user = await ProductModel.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Products
router.get('/', async (req, res) => {
    const qNew = req.query.new
    const qCategory = req.query.category
    try {
        let products ;
        if(qNew){
        products = await ProductModel.find().sort({ createdAt: -1 }).limit(1);
        } else if(qCategory) {
            products = await ProductModel.find({
                categories: {
                    $in : [qCategory]
                }
            });
        } else {
            products = await ProductModel.find();
        }
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get Product Stats
router.get('/stats', async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1));
    try {
        const data = await ProductModel.aggregate([
            { $math: { createdAt: { $gte: lastYear } } },
            {
                $project:
                {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group:
                {
                    _id: $month,
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;