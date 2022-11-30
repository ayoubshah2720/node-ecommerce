// const CartModel = require('../models/CartModel');
// const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

// const router = require('express').Router();
// //Create Cart
// router.post('/', verifyTokenAndAuthorization, async (req,res) => {
//     const cartObj = new CartModel(req.body)
//     try {
//         const saveCart = await cartObj.save();
//         res.status(200).json(saveCart)
//     } catch (error) {
//         res.status(500).json(error);
//     }
// })

// //Update Cart
// router.put('/:id', async (req, res) => {
//     try {
//         const updateCart = await CartModel.findByIdAndUpdate(req.params.id,
//             { $set: req.body },
//             { new: true }
//         )
//         res.status(200).json(updateCart)

//     } catch (error) {
//         res.status(500).json(error)
//     }
// })

// //Delete Cart
// router.delete('/:id', async (req, res) => {
//     try {
//         await CartModel.findByIdAndDelete(req.params.id)
//         res.status(200).json("User has been deleted...")
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

// //Get Cart
// router.get('/:userId', async (req, res) => {
//     try {
//         const cart = await CartModel.findOne({userId:req.params.userId})
//         res.status(200).json(cart);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

// //Get All Carts
// router.get('/', async (req, res) => {
//     try {
//         const cartProducts = await CartModel.find();
//         res.status(200).json(cartProducts);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// });

// module.exports = router;