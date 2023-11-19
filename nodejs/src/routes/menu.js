// export class MenuInformation{
//     menu_name;
//     menu_description;
//     menu_price;
//     file_path;
    
//     constructor(props){
//         this.menu_name = props.menu_name;
//         this.menu_description = props.menu_description;
//         this.menu_price = props.menu_price;
//         this.file_path = props.file_path;
        
//     }
// }

const express = require('express');
const prisma = require('prisma');
const router = express.Router();
const dotenv = require('dotenv')
dotenv.config()


/*//추천 메뉴리스트 보기 
router.get('/menu/recommend', async(req,res,error) => {
    git /menu/recommend
})*/ //<- 이거는 알고리즘이 필요하기 때문에 조금 더 생각을 해 보아요.



//선택한 메뉴 상세보기
router.get('/:menuID', async(req,res,error) => { //<- :menuID는 req.params.menuID내에 존재
    const thismenuID = req.body.menuID; //menuID를 가져와서
    console.log("menuID : ",thismenuID);

    //DB에서 menuID 매칭후 추출
    const result = await prisma.Menu.findUnique({
        where: {
            menuID: thismenuID
        },
        select: {
            select: {
                menu_name: true,
                menu_discription: true,
                price: true,
                file_path: true
            }
        }
    });

    console.log("menu_name : ",result.menu_name);
    console.log("menu_description : ",result.menu_description);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);     
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
})



//카테고리 별로 메뉴리스트보기
router.get('/:categoryID', async(req,res,error) => {
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
            file_path: true
        }
    })

    console.log("menuID : ",result.menuID);
    console.log("menu_name : ",result.menu_name);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
});


module.exports = router;
// module.exports = menu;