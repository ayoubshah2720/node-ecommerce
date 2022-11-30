const OrderModel = require('../models/OrderModel');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();
//Create Order
router.post('/', verifyTokenAndAuthorization, async (req,res) => {
    const orderObj = new OrderModel(req.body)
    try {
        const saveCart = await orderObj.save();
        res.status(200).json(saveCart)
    } catch (error) {
        res.status(500).json(error);
    }
})

//Update Order
router.put('/:id', async (req, res) => {
    try {
        const updateOrder = await OrderModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateOrder)

    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete Order
router.delete('/:id', async (req, res) => {
    try {
        await OrderModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get Order
router.get('/:userId', async (req, res) => {
    try {
        const order = await OrderModel.findOne({userId:req.params.userId})
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Orders
router.get('/', async (req, res) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get User Income
router.get('/income', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth - 1));
    try {
        const income = await UserModel.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project:
                {
                    month: { $month: "$createdAt" },
                    sales: '$amount',
                },
            },
            {
                $group:
                {
                    _id: '$month',
                    total: { $sum: '$sales' },
                }
            }
        ])
        res.status(200).json(income);
    } catch (error) {
        res.status(500).json(error)
    }
});

module.exports = router;