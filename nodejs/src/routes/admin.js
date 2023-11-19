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

//관리자 카테고리별 메뉴
router.get('/', async(req,res,error) => {
    const thisCategoryID = req.body.categoryID; //categoryID를 가져와서
    console.log("categoryID : ",thisCategoryID);

    //카테고리 같은거 추출후 보내줌.
    const result = await prisma.Menu.findMany({
        where: {
            categoryId: thisCategoryID
        },
        select: {
            menuID: true,
            menu_name: true,
            price: true,
            file_path: true,
            is_soldout: true
        }
    })

    console.log("menuID : ",result.menuID);
    console.log("menu_name : ",result.menu_name);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);
    console.log("is_soldout : ",result.is_soldout);
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
});

module.exports = router;