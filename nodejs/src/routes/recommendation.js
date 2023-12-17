// recommendation.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// // 코사인 유사성 계산 함수
// function calculateCosineSimilarity(user1Orders, user2Orders) {
//   // user2Orders가 배열인지 확인
//   console.log("user1 type:",typeof(user1Orders))
//   console.log("user1:",user1Orders)
//   console.log("user2 type:",typeof(user2Orders))
//   console.log("user2:",user2Orders)

//   const commonMenuIds = getCommonMenuIds(user1Orders, user2Orders);

//   if (commonMenuIds.length === 0) {
//     return 0; // 공통된 메뉴가 없으면 유사성 0
//   }

//   const dotProduct = calculateDotProduct(user1Orders, user2Orders, commonMenuIds);
//   const magnitudeUser1 = calculateMagnitude(user1Orders, commonMenuIds);
//   const magnitudeUser2 = calculateMagnitude(user2Orders, commonMenuIds);

//   if (magnitudeUser1 === 0 || magnitudeUser2 === 0) {
//     return 0; // 분모가 0이면 유사성 0
//   }

//   return dotProduct / (magnitudeUser1 * magnitudeUser2);

  
// }

// // 공통된 메뉴 아이디 추출
// function getCommonMenuIds(user1Orders, user2Orders) {
//   const user1MenuIds = user1Orders.map(order => order.menuID);
//   const user2MenuIds = user2Orders.map(order => order.menuID);
//   return [...new Set(user1MenuIds.filter(menuId => user2MenuIds.includes(menuId)))];
// }

// // Dot Product 계산
// function calculateDotProduct(user1Orders, user2Orders, commonMenuIds) {
//   return commonMenuIds.reduce((sum, menuId) => {
//     const orderCountUser1 = getUserOrderCount(user1Orders, menuId);
//     const orderCountUser2 = getUserOrderCount(user2Orders, menuId);
//     return sum + orderCountUser1 * orderCountUser2;
//   }, 0);
// }

// // 사용자가 특정 메뉴를 주문한 횟수 가져오기
// function getUserOrderCount(userOrders, menuId) {
//   const order = userOrders.find(order => order.menuID === menuId);
//   return order ? order.order_count : 0;
// }

// // 벡터의 크기(Magnitude) 계산
// function calculateMagnitude(userOrders, commonMenuIds) {
//   return Math.sqrt(commonMenuIds.reduce((sum, menuId) => {
//     const orderCount = getUserOrderCount(userOrders, menuId);
//     return sum + orderCount * orderCount;
//   }, 0));
// }

function JaccardSimilarity(targetUserOrders, userOrders) {
  // menuID의 문자열 값만 추출하여 새로운 Set 생성
  const set1 = new Set(targetUserOrders.map(order => order.menuID));
  const set2 = new Set(userOrders.menuIDList.map(order => order.menuID));

  console.log(">>set1:", set1);
  console.log(">>set2:", set2);

  const intersection = new Set([...set1].filter(x => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  console.log(">>Intersection:", intersection);
  console.log(">>Union:", union);

  const intersectionSize = intersection.size;
  const unionSize = union.size;

  console.log(">>Intersection Size:", intersectionSize);
  console.log(">>Union Size:", unionSize);

  return unionSize === 0 ? 0 : intersectionSize / unionSize;
}



// 상위 유사한 사용자들이 주문한 메뉴 중에서 가장 많이 주문된 메뉴 선택 함수
async function getMostOrderedMenu(topSimilarUsers, targetUserOrders) {
  const menuFrequency = new Map();

  console.log(">> Top Similar Users:", topSimilarUsers);
  console.log(">> Target User Orders:", targetUserOrders);

  for (const similarUser of topSimilarUsers) {
    console.log(">> Processing Similar User:", similarUser.userId);
    const userMenus = await prisma.menuOrderInfo.findMany({
      where: {
        userID: similarUser.userId,
      },
      select: {
        menuID: true,
      },
    });

    console.log(">> User Menus:", userMenus);

    userMenus.forEach(menu => {
      console.log(">> Checking Menu:", menu.menuID);
      if (!targetUserOrders.some(order => order.menuID === menu.menuID)) {
        console.log(">> New Menu for Target User:", menu.menuID);
        const currentCount = menuFrequency.get(menu.menuID) || 0;
        menuFrequency.set(menu.menuID, currentCount + 1);
      }
    });
  }

  console.log(">> Menu Frequency Map:", menuFrequency);

  let mostOrderedMenu = null;
  let maxFrequency = 0;

  menuFrequency.forEach((count, menuID) => {
    console.log(">> Menu ID:", menuID, "Count:", count);
    if (count > maxFrequency) {
      mostOrderedMenu = { menuID };
      maxFrequency = count;
      console.log(">> New Most Ordered Menu:", mostOrderedMenu);
    }
  });

  console.log(">> Final Most Ordered Menu:", mostOrderedMenu);

  return mostOrderedMenu;
}



// 사용자 기반 협업 필터링 추천 알고리즘 함수
async function recommendMenuForUser(targetUserId, N) {
  // 대상 사용자의 주문 내역 가져오기
  const targetUserOrders = await prisma.menuOrderInfo.findMany({
    where: {
      userID: targetUserId,
    },
    select: {
      menuID: true,
    },
  });

  // 다른 사용자들의 주문 내역 가져오기

  //여기부터
  const usersMenuOrders = await prisma.menuOrderInfo.findMany({
    select: {
      user: {
        select: {
          user_id: true,
        },
      },
      menu: {
        select: {
          menu_id: true,
        },
      },
    },
  });
  const allUsersOrders = usersMenuOrders.reduce((result, order) => {
    const userId = order.user.user_id;
    const menuId = order.menu.menu_id;
  
    const existingUser = result.find(user => user.userId === userId);
  
    if (existingUser) {
      existingUser.menuIDList.push({
        menuID: menuId,
      });
    } else {
      result.push({
        userId,
        menuIDList: [{
          menuID: menuId,
        }],
      });
    }
    return result;
  }, []);
  console.log("allusersorders!!!!! : ",allUsersOrders);
  // [(key: 사용자ID , value: [a, b, c ])]
  // a = (key: a메뉴 ID, value: a메뉴 주문횟수)

  // 대상 사용자와 다른 사용자들 간의 유사성 측정
  const similarUsers = [];

  for (const userOrders of allUsersOrders) {
    console.log("userOrders@@@",userOrders)
    const similarity = JaccardSimilarity(targetUserOrders, userOrders);
    similarUsers.push({ userId: userOrders.userId, similarity });
     console.log(">>대상 사용자와 다른 사용자들 간의 유사성 측정:",similarUsers)
  }

  // 유사성이 높은 순서로 정렬
  similarUsers.sort((a, b) => b.similarity - a.similarity);

  // 상위 N개의 유사한 사용자 가져오기
  const topSimilarUsers = similarUsers.slice(0, N);
  console.log(">>상위 N개의 유사한 사용자:",topSimilarUsers)

  // 상위 유사한 사용자들이 주문한 메뉴 중에서 가장 많이 주문된 메뉴 선택
  const mostOrderedMenu = await getMostOrderedMenu(topSimilarUsers, targetUserOrders);

  return mostOrderedMenu;
}

module.exports = { recommendMenuForUser };

