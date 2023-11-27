const express = require('express');
const router = express.Router();
const dotenv = require('dotenv')
const prisma = require('../database')
const prisma = new PrismaClient();
dotenv.config()

router.post('/', async (req, res) => {
  try {
    const { user_id, menu_ids } = req.body;

    // user_id에 해당하는 menuOrderInfo 가져오기
    const userOrderInfo = await prisma.menuOrderInfo.findMany({
      where: {
        userID: user_id,
      },
    });

    // menu_ids에 해당하는 메뉴들을 찾아 업데이트
    for (const menu_id of menu_ids) {
      const menuOrder = userOrderInfo.find(order => order.menuID === menu_id);

      if (menuOrder) {
        // 이미 주문한 메뉴라면 주문 횟수를 증가
        await prisma.menuOrderInfo.update({
          where: {
            userID_menuID: {
              userID: user_id,
              menuID: menu_id,
            },
          },
          data: {
            order_count: menuOrder.order_count + 1,
            last_order_time: new Date(),
          },
        });
      } else {
        // 주문한 적 없는 메뉴라면 새로 추가
        await prisma.menuOrderInfo.create({
          data: {
            userID: user_id,
            menuID: menu_id,
            order_count: 1,
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