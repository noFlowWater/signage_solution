const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
const recommendationModule = require('./recommendation');
dotenv.config()


//추천 메뉴리스트 보기 
router.get('/menu/0', async (req, res, error) => {
  const thisuser_id = req.body.user_id;
  console.log("user_id : ", thisuser_id);
  resultarr = [];

  // 내가 최근에 먹은 메뉴
  const result1 = await prisma.MenuOrderInfo.findFirst({
      where: {
          user_id: thisuser_id
      },
      select: {
          menu_id: true,
          menu_name: true,
          price: true,
          file_path: true,
          is_soldout: true,
          orderBy: {
              last_order_time: "desc",
          },
      }
  });

  resultarr.push(result1); // result1을 배열에 추가

  // 내가 가장 많이 먹은 메뉴
  const result2 = await prisma.menuOrderInfo.groupBy({
      by: ['menu_id', 'menu_name', 'price', 'file_path', 'is_soldout'],
      _count: {
          menu_id: true
      },
      where: {
          user_id: thisuser_id
      },
      orderBy: {
          _count: {
              menu_id: 'desc'
          }
      },
      select: {
          menu_id: true,
          menu_name: true,
          price: true,
          file_path: true,
          is_soldout: true
      }
  });

  resultarr.push(result2); // result2를 배열에 추가

  const N = 5; // 상위 N개의 유사한 사용자 가져오기
  try {
      const result3 = await recommendationModule.recommendMenuForUser(targetUserId, N);
      resultarr.push(result3); // result3를 배열에 추가

      // 여기서 resultarr을 사용하여 클라이언트에게 응답을 보낼 수 있음
  } catch (error) {
      next(error);
  }

  res.json(resultarr);ㅊ3
});


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
    const allergies = await prisma.relation_menu_allergy.findMany({
        
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