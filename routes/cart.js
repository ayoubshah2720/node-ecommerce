const router = require('express').Router();

router.get('/usertest',(req,res)=>{
    res.send('User test is successful......');
});


router.post('/save',(req,res)=>{
    const userObj = {
        userName: req.body.userName,
        password: req.body.password
    };
    console.log('userObj',userObj)
});

module.exports =  router;