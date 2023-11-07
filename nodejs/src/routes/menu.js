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


//추천 메뉴리스트 보기
/*router.get('/menu/recommend', async(req,res,error) => {
    
})*/

//선택한 메뉴 상세보기
router.get('/:menuID', async(req,res,error) => { //<- :menuID는 req.params.menuID내에 존재
    const thismenuID = req.params.menuID; //menuID를 가져와서
    console.log("menuID : ",menuID);

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
    console.log("menu_name : ",result.menu_discription);
    console.log("menu_name : ",result.menu_);
    console.log("menu_name : ",result.menu_name);     
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(result);
})


module.exports = router;
// module.exports = menu;