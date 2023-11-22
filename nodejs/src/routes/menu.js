const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
dotenv.config()


/*//추천 메뉴리스트 보기 
router.get('/menu/recommend', async(req,res,error) => {
    git /menu/recommend
})*/ //<- 이거는 알고리즘이 필요하기 때문에 조금 더 생각을 해 보아요.



//선택한 메뉴 상세보기
router.get('/detail/:menu_id', async(req,res,error) => { //<- :menu_id는 req.params.menu_id내에 존재
    const thismenu_id = req.params.menu_id; //menu_id를 가져와서
    console.log("menu_id : ",thismenu_id);

    //DB에서 menu_id 매칭후 추출
    const result = await prisma.menu.findUnique({
        where: {
            menu_id: thismenu_id
        },
    });

    console.log("menu_name : ",result.menu_name);
    console.log("menu_description : ",result.menu_description);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);     
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
})



//카테고리 별로 메뉴리스트보기
router.get('/:category_id', async(req,res,error) => {
    //const thiscategory_id = req.params.category_id; //category_id를 가져와서
    //console.log("category_id : ",thiscategory_id);

    //카테고리 같은거 추출후 보내줌.
    const result = await prisma.menu.findMany({
        where: {
            category_id: req.params.category_id
        }
    })

    console.log("menu_id : ",result.menu_id);
    console.log("menu_name : ",result.menu_name);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
});


module.exports = router;
// module.exports = menu;