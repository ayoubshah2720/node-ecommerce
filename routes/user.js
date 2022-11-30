const UserModel = require('../models/UserModel');
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require('./verifyToken');

const router = require('express').Router();

router.get('/usertest', (req, res) => {
    res.send('User test is successful......');
});

//Update User
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    console.log('checking .... ')
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }

    try {
        const updateUser = await UserModel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser)

    } catch (error) {
        res.status(500).json(error)
    }
})

//Delete User
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted...")
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get User
router.get('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id)
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get All Users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new
    try {
        const users = query ? await UserModel.find().sort({ _id: -1 }).limit(1) : await UserModel.find()
        // const {password, ...others} = users._doc;
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)
    }
});

//Get User Stats
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear - 1));
    try {
        const data = await UserModel.aggregate([
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