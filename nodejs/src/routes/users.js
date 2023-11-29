const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
dotenv.config()


//사용자가 주문
router.post('/order', async (req, res) => {
    try {
      const user_id = req.body.user_id;
      const orders = req.body.orders;
  
      console.log('Received POST request for order update:');
      console.log('User ID:', user_id);
      console.log('Orders:', orders);
  
      // user_id에 해당하는 menuOrderInfo 가져오기
      const userOrderInfo = await prisma.menuOrderInfo.findMany({
        where: {
          user: {
            user_id: user_id,
          },
        },
      });
  
      console.log('User Order Info:', userOrderInfo);
  
      // orders에 해당하는 메뉴들을 찾아 업데이트
      for (const { menu_id, order_count } of orders) {
        console.log('Processing order:', { menu_id, order_count });
  
        const menuOrder = userOrderInfo.find(order => order.menuID === menu_id);
  
        if (menuOrder) {
            // 이미 주문한 메뉴라면 주문 횟수를 업데이트
            console.log('Updating existing order:', { user_id, menu_id, order_count });
            await prisma.menuOrderInfo.update({
              where: {
                userID_menuID: {
                  userID: user_id,
                  menuID: menu_id,
                },
              },
              data: {
                order_count: menuOrder.order_count + order_count,
                last_order_time: new Date(),
              },
            });
          }
          
        else {
          // 주문한 적 없는 메뉴라면 새로 추가
          console.log('Creating new order:', { user_id, menu_id, order_count });
          await prisma.menuOrderInfo.create({
            data: {
              order_count: order_count,
              last_order_time: new Date(),
              user : {
                connect : {user_id : user_id}
                },
              menu: {
                connect : {menu_id : menu_id}
              }
                
            },
          });
        }
      }
  
      console.log('Order update successful.');
      res.json({ success: true, message: 'Order updated successfully.' });
    } catch (error) {
      console.error('Error updating order:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  });
//회원가입한 유저와 보유 알러지 연결
router.post('/', async(req,res,err) => {
try {
    if(req.body.allergies.length > 0){
        //배열 parsing하기
        let all = req.body.allergies;
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
                    await prisma.relation_user_allergy.create({
                    data: {
                        users: { connect: { user_id: req.body.user_id } },
                        allergies: { connect: { allergy_id: existingAllergy.allergy_id } },
                    },
                    });
            }
        }
    }
    res.sendStatus(200);
} catch (error) {
    console.log(error)
    res.status(500).send(error);
}
})
  
module.exports = router;