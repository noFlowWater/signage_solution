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
    const allergy = [];
    console.log(req.body);
    const price = parseInt(req.body.price);
    const is_soldout = Boolean(req.body.is_soldout);
    const menu = await prisma.menu.upsert ({
        where : {menu_name : req.body.menu_name},
        update : {},
        create : {
            menu_name : req.body.menu_name,
            menu_description : req.body.menu_description,
            price : price,
            file_path : req.body.file_path,
            is_soldout : is_soldout,
            category : {
                connect : {category_name : req.body.category_name}
            },
        }
    })
    res.status(200).send(menu);
    // const allergy_table = await prisma.relation_menu_allergy.create ({
    //     data : {
    //         menus : {
    //             connect : { menu_name : req.body.menu_name}
    //         },
    //         allergies : {
    //             connect : {allergy_name : "밀"}
    //         }
    //     }
    // })
    console.log("success");
})

//관리자 카테고리별 메뉴
router.get('/:category_id', async(req,res,error) => {
    const thiscategory_id = req.params.category_id; //category_id를 가져와서
    console.log("category_id : ",req.params.category_id);
    //카테고리 같은거 추출후 보내줌.
    const result = await prisma.menu.findMany({
        where: {
            category_id: req.params.category_id
        },
    })
    res.json(result);
});

//관리자 메뉴 삭제
router.delete('/:menu_id', async(req,res,error) => {
    const thismenu_id = req.params.menu_id; //menu_id 가져와서
    console.log("menu_id : ",thismenu_id);

    //삭제하는 구문
    try{const result = await prisma.menu.delete({
        where: {
            menu_id : thismenu_id,
        },
    })}catch(error){
        console.log(`error : ${error}`);
        res.sendStatus(500); //실패시 500
    }

    //성공시 200
    res.sendStatus(200);
});
 
//메뉴 수정 <- 이거 잘못된 코드입니다~바꿔야돼용.
router.put('/:menu_id', async(req,res,error) => {
    const thismenu_id= req.params.menu_id; 
    console.log("thismenu_id : ",thismenu_id);
    const price = parseInt(req.body.price);
    
    const result = await prisma.menu.update({
        where: {
            menu_id: thismenu_id
        },
        data: {
            menu_name: req.body.menu_name,
            menu_description: req.body.menu_description,
            price: price,
            file_path: req.body.file_path,
            is_soldout: req.body.is_soldout,
            category_id: req.body.category_id
        }
    })

    console.log("menu_id : ",result.menu_id);
    console.log("menu_name : ",result.menu_name);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);
    console.log("is_soldout : ",result.is_soldout);
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
});

module.exports = router;