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
    console.log("body",req.body);
    const price = parseInt(req.body.price);
    const is_soldout = Boolean(req.body.is_soldout);
    // allergy = ["","",""] 이렇게 req로 날아옴
    console.log(req.body.allergy.length);
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
                connect : {category_id : req.body.category_id}
            }
        }
    })
    if(req.body.allergy.length > 0){
        //배열 parsing하기
        let all = req.body.allergy;
        console.log("all:",all);
        var allergies = all.join(',').split(',');
        console.log("allergies",allergies);
        const connections = allergies.map(allergyName => {
            return {allergy_name : allergyName}
        })
        console.log("connections",connections);
        //메뉴에 알러지 정보 넣기
        console.log("name: ",req.body.menu_name);
        for (const allergy_name of allergies) {
            // 데이터베이스에서 알러지 찾기
            if (allergy_name != "없음"){
                const existingAllergy = await prisma.allergy.findUnique({
                    where: { allergy_name },
                  });
                  // 메뉴와 알러지 연결
                  await prisma.relation_menu_allergy.create({
                    data: {
                      menus: { connect: { menu_id: menu.menu_id } },
                      allergies: { connect: { allergy_id: existingAllergy.allergy_id } },
                    },
                  });
            }
        }
        // const allergyMenuConnections = connections.map(allergyConnection => {
        //     return {
        //         menus: {
        //             connect: { menu_name: req.body.menu_name }
        //           },
        //         allergies: {
        //             connect: { allergy_name: allergyConnection}
        //         }
        //     };
        //   });
        // console.log("allergyMenuConnections: ", allergyMenuConnections);
        // const allergy_table = await prisma.relation_menu_allergy.create ({
        //     data : allergyMenuConnections
        // })
        // console.log("success");
    }
    res.status(200).send(menu);
})

//관리자 카테고리별 메뉴
router.get('/:category_id', async(req,res,error) => {
    //const thiscategory_id = req.params.category_id; //category_id를 가져와서
    console.log("category_id : ", req.params.category_id);
    //카테고리 같은거 추출후 보내줌.
    const result = await prisma.menu.findMany({
        where: {
            category_id: req.params.category_id
        },
    })
    console.log(result)
    res.json(result);
});

//관리자 메뉴 삭제
router.delete('/', async(req,res,error) => {
    const thismenu_ID = req.body.menu_id; //menu_id 가져와서
    console.log("menu_ID : ",thismenu_ID);

    //삭제하는 구문
    try{const result = await prisma.menu.delete({
        where: {
            menu_id : thismenu_ID,
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
    
    const result = await prisma.menu.update({
        where: {
            menu_id: thismenu_id
        },
        select: {
            menu_name: true,
            price: true,
            file_path: true,
            is_soldout: true
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