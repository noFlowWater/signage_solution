const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
const recommendationModule = require('./recommendation');
dotenv.config()

//사용자의 메뉴 기능들

//추천 메뉴리스트 보기 
router.post('/0', async (req, res, err) => {
  const thisuser_id = req.body.user_id;
  console.log("user_id : ", thisuser_id);
  resultarr = [null,null,null];
  

  // 내가 최근에 먹은 메뉴
  const result1 = await prisma.MenuOrderInfo.findFirst({
      where: {
          userID: thisuser_id
      },
      select: {
          menuID: true,
      },
      orderBy: {
        last_order_time: "desc",
    },
  });

  if(result1){
    const recentMenu = await prisma.menu.findUnique({
        where : {
        menu_id : result1.menuID
    }
    })
    //해당 메뉴 알러지 정보
    const allergyInfo = await prisma.menu.findUnique({
        where: {
            menu_id: result1.menuID
        },
        include : {
            relationToAllergy : {
                select : {
                    allergies : {
                        select :{
                            allergy_name : true
                        }
                    }
                }
            }
        }
    });
    //알러지 이름만 추출
    const allergies = allergyInfo.relationToAllergy.map(names => 
        names.allergies.allergy_name)
    
    //메뉴와 알러지 정보 합치기
    const menuWithAllergy = Object.assign(recentMenu, { allergies: allergies })
    resultarr[0] = menuWithAllergy; 
  }

    

  // 내가 가장 많이 먹은 메뉴
  const result2 = await prisma.menuOrderInfo.findFirst({
    where: {
        userID: thisuser_id
    },
    select: {
        menuID: true,
    },
    orderBy: {
      order_count: "desc",
    },
  });
  if(result2) {
    const countMost = await prisma.menu.findUnique({
        where : {
            menu_id : result2.menuID
        }
        })
      //해당 메뉴 알러지 정보
    const allergyInfo = await prisma.menu.findUnique({
        where: {
            menu_id: result2.menuID
        },
        include : {
            relationToAllergy : {
                select : {
                    allergies : {
                        select :{
                            allergy_name : true
                        }
                    }
                }
            }
        }
    });
    //알러지 이름만 추출
    const allergies = allergyInfo.relationToAllergy.map(names => 
        names.allergies.allergy_name)
    
    //메뉴와 알러지 정보 합치기
    const menuWithAllergy = Object.assign(countMost, { allergies: allergies })
    resultarr[1] = menuWithAllergy; 
  }


  //추천 알고리즘
  const N = 3; // 상위 N개의 유사한 사용자 가져오기
  try {
    if(resultarr[0] != null){
      const result3 = await recommendationModule.recommendMenuForUser(thisuser_id, N);
      console.log("result3",result3.menuID)
      const similarMenu = await prisma.menu.findUnique({
        where : {
            menu_id : result3.menuID
        }
      })
      //해당 메뉴 알러지 정보
    const allergyInfo = await prisma.menu.findUnique({
        where: {
            menu_id: similarMenu.menu_id
        },
        include : {
            relationToAllergy : {
                select : {
                    allergies : {
                        select :{
                            allergy_name : true
                        }
                    }
                }
            }
        }
    });
    //알러지 이름만 추출
    const allergies = allergyInfo.relationToAllergy.map(names => 
        names.allergies.allergy_name)
    
    //메뉴와 알러지 정보 합치기
    const menuWithAllergy = Object.assign(similarMenu, { allergies: allergies })
    resultarr[2] = menuWithAllergy; 
      //배열에추가
      // 여기서 resultarr을 사용하여 클라이언트에게 응답을 보낼 수 있음
    }
    else()=>{
        resultarr[2] = null;
    }} catch (error) {
        console.log(error);
    }
    console.log(resultarr);
    res.json(resultarr);
    });


//선택한 메뉴 상세보기
router.get('/detail/:menu_id', async(req,res,error) => { //<- :menu_id는 req.params.menu_id내에 존재
    const thismenu_id = req.params.menu_id; //menu_id를 가져와서
    // console.log("menu_id : ",thismenu_id);

    //DB에서 menu_id 매칭후 추출
    try {
        //해당 메뉴 찾기
        const result = await prisma.menu.findUnique({
            where : {
                menu_id : thismenu_id
            }
        })
        //해당 메뉴 알러지 정보
        const allergyInfo = await prisma.menu.findUnique({
            where: {
                menu_id: thismenu_id
            },
            include : {
                relationToAllergy : {
                    select : {
                        allergies : {
                            select :{
                                allergy_name : true
                            }
                        }
                    }
                }
            }
        });
        //알러지 이름만 추출
        const allergies = allergyInfo.relationToAllergy.map(names => 
                names.allergies.allergy_name)

        //메뉴와 알러지 정보 합치기
        const menuWithAllergy = Object.assign(result, { allergies: allergies })
        res.json(menuWithAllergy);
    } catch (err) {
        console.log(err)
    }
    // console.log("menu_name : ",result.menu_name);
    // console.log("menu_description : ",result.menu_description);
    // console.log("price : ",result.price);
    // console.log("file_path : ",result.file_path);     
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
})



//카테고리 별로 메뉴리스트보기
router.get('/:category_id', async(req,res,error) => {
    //const thiscategory_id = req.params.category_id; //category_id를 가져와서
    //console.log("category_id : ",thiscategory_id);

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
    console.log("menu_id : ",result.menu_id);
    console.log("menu_name : ",result.menu_name);
    console.log("price : ",result.price);
    console.log("file_path : ",result.file_path);
    //res.json() 해서 메뉴표시에 필요한것들 보내주면 된다.
    res.json(combinedResult);
});


module.exports = router;