const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
const prisma = new PrismaClient();
dotenv.config()

// router.js


router.post('', async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const orders = req.body.orders;

    // user_id에 해당하는 menuOrderInfo 가져오기
    const userOrderInfo = await prisma.menuOrderInfo.findMany({
      where: {
        userID: user_id,
      },
    });
    console.log("user_id : ",user_id)
    console.log("orders.menu_ID : ",orders.menu_id)
    console.log("orders.order_count : ",orders.order_count)

    // orders에 해당하는 메뉴들을 찾아 업데이트
    for (const { menu_id, order_count } of orders) {
      const menuOrder = userOrderInfo.find(order => order.menuID === menu_id);

      if (menuOrder) {
        // 이미 주문한 메뉴라면 주문 횟수를 업데이트
        await prisma.menuOrderInfo.update({
          where: {
            userID_menuID: {
              userID: user_id,
              menuID: menu_id,
            },
          },
          data: {
            order_count: order_count,
            last_order_time: new Date(),
          },
        });
      } else {
        // 주문한 적 없는 메뉴라면 새로 추가
        await prisma.menuOrderInfo.create({
          data: {
            userID: user_id,
            menuID: menu_id,
            order_count: order_count,
            last_order_time: new Date(),
          },
        });
      }
    }

    res.json({ success: true, message: 'Order updated successfully.' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

module.exports = router;
