const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const prisma = require('../database');

dotenv.config()

var is_auth = false;

//admin login
router.post('/login', async(req,res,error) => {
    try {
        if (req.body.password == process.env.ADMIN_PASSWORD){
            is_auth = true;
            console.log('login success');
            res.json({"status": "success"});
        }
        else {
            console.log('login failed');
            is_auth = false;
            res.sendStatus(200);
        }
    } catch(error) {
        console.log(`error : ${error}`);
    }
}) 
//admin categoryadd 기본 데이터 세팅 -> 생성 기능 없음
// router.post('/category', async(req,res,error) => {
//     try{
//         const category = prisma.category.create({
//             data: {
//                 category_name: req.body.categoryName
//             }
//         })
//         .then(
//             //await prisma.$disconnect,
//             console.log(req.body.categoryName)
//         )
//         res.json({"try" : "성공"});
//     } catch (error) {
//         console.log(error);
//     }
// })

//admin menuadd
router.post('/menu', async(req,res,error) => {
    try{
        console.log(`name : ${req.body.category}`);
        const category = await prisma.category.findFirst({
            where: {
                category_name : req.body.category
            }
        })
        console.log(`category: ${category.category_id}`);
        const price = parseInt(req.body.price);
        if (isNaN(price)) {
            return res.status(400).json({ error: 'Invalid price: must be a number' });
        }
        try{
            const menu = await prisma.menu.create({
                data: {
                    menu_name: req.body.name,
                    menu_description: req.body.des,
                    price: req.body.price,
                    file_path : " ",
                    is_soldout: req.body.is_soldout,
                    category_id: category.category_id
                }
            });
        } catch (error) {
            console.log(error);
        }
    } catch(error) {
        console.log(error);
    }
})

module.exports = router;