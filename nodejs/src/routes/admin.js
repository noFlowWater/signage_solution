const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()

var is_auth = false;

//admin login
router.post('/login', async(req,res,error) => {
    try {
        //console.log(req.body.password);
        if (req.body.password == process.env.ADMIN_PASSWORD){
            is_auth = true;
            console.log('login success');
            res.json(req.body);
        }
        else {
            console.log('login failed');
            is_auth = false;
        }
    } catch(error) {
        console.log(`error : ${error}`);
    }
}) 

module.exports = router;