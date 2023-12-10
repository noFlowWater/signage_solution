const express = require('express');
const router = express.Router();
const dotenv = require('dotenv');
const prisma = require('../database');
const multer = require('multer')

dotenv.config()

const storage = multer.diskStorage({
    destination : function(req,file,cb) {
        cb(null, 'uploads')
    },
    filename : function(req,file,cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});

var is_auth = false;
//관리자 비밀번호 변경
router.put('/', async(req,res,error) => {
    try{
        const admin = await prisma.admin.update(
            {
                where : {
                    user_id : "1"
                },
                data : {
                    password : req.body.password
                }
            }
        )
        console.log(admin)
        res.json({"status" : "success"})
    } catch(error){
        console.log(error)
        res.json({"status" : "failed"})
    }
})

//admin login
router.post('/login', async(req,res,error) => {
    try {
        const admin = await prisma.admin.findUnique(
            {where : {
                user_id : req.body.user_id
            }
        }
        )
        if (req.body.password == admin.password){
            is_auth = true;
            console.log('login success');
            res.json({"status": "success"});
        }
        else {
            console.log('login failed');
            is_auth = false;
            res.json({"status" : "fail"});
        }
    } catch(error) {
        console.log(`error : ${error}`);
    }
}) 
//사진 업로드 함수
const uploads = multer(
    {
        storage : storage
    }
).single('file');

let file_path = ""

//admin menu 이미지 업로드
router.post('/image', async(req,res,err) => {
    console.log(req.file);
    //파일 업로드
    uploads(req,res,err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }
        //console.log(res.req.file.filename);
        file_path = res.req.file.filename;
        return res.json({file : res.req.file.filename})
    }) 
})
//admin menu 이미지 수정
router.put('/image', async(req,res,err) => {
    console.log(req.file);
    //파일 업로드
    uploads(req,res,err => {
        if(err) {
            console.log(err);
            return res.status(500).send(err);
        }
        console.log(res.req.file.filename);
        file_path = res.req.file.filename;
        return res.json({file : res.req.file.filename})
    }) 
})


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
            is_soldout : is_soldout,
            category : {
                connect : {category_id : req.body.category_id}
            },
            file_path : file_path
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
    }
    res.status(200).send(menu);
})

//관리자 카테고리별 메뉴 보여주기
router.get('/:category_id', async(req,res,error) => {
    const thiscategory_id = req.params.category_id; //category_id를 가져와서
    console.log("category_id : ",req.params.category_id);
    //카테고리 같은거 추출후 보내줌.

    //메뉴와 연결된 알러지 정보 가져오기
    const allResults = await prisma.menu.findMany({
        where: {
            category_id: req.params.category_id
        },
        include : {
            relationToAllergy : {
                select : {
                    allergies : {
                        select : {
                            allergy_name : true
                        }
                    }
                }
            }
        }
    })
    //알러지 이름만 추출
    const allergies = allResults.map(items => 
        items.relationToAllergy.map(names => 
            names.allergies.allergy_name))
    // console.log(allergies)
    //해당 카테고리를 가진 메뉴 추출
    const result = await prisma.menu.findMany({
        where: {
            category_id: req.params.category_id
        }
    })
    //메뉴와 알러지 combine
    const combinedResult = result.map((item, index) =>
    Object.assign({}, item, { allergies: allergies[index] })
    );
    console.log(combinedResult);
    // console.log(result)
    res.json(combinedResult);
});

//관리자 메뉴 삭제
router.delete('/:menu_id', async(req,res,error) => {
    const thismenu_id = req.params.menu_id; //menu_id 가져와서
    console.log("menu_id : ",thismenu_id);
    //삭제하는 구문
    try{
        const result1 = await prisma.menuOrderInfo.deleteMany({
            where : {
                menuID : thismenu_id,
            }
        })
        const result = await prisma.menu.delete({
            where: {
                menu_id : thismenu_id,
            },
        })
        //성공시 200
        res.sendStatus(200);
    } catch(error){
        console.log(`error : ${error}`);
        res.sendStatus(500); //실패시 500
    }
});
 
//메뉴 수정
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
            file_path: file_path,
            is_soldout: req.body.is_soldout,
            category_id: req.body.category_id
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
        //수정 시 알러지 배열은 싹 다 비워야함
        const deleteAll = await prisma.relation_menu_allergy.deleteMany({
            where : {menuID : thismenu_id}
        })
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
                      menus: { connect: { menu_id: thismenu_id } },
                      allergies: { connect: { allergy_id: existingAllergy.allergy_id } },
                    },
                  });
            }
        }
    }
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
});

module.exports = router;