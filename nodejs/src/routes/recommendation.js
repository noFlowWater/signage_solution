// recommendation.js

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// 코사인 유사성 계산 함수
function calculateCosineSimilarity(user1Orders, user2Orders) {
  // user2Orders가 배열인지 확인
  if (!Array.isArray(user2Orders)) {
    console.error('오류: user2Orders가 배열이 아닙니다');
    return 0;
  }

  const commonMenuIds = getCommonMenuIds(user1Orders, user2Orders);

  if (commonMenuIds.length === 0) {
    return 0; // 공통된 메뉴가 없으면 유사성 0
  }

  const dotProduct = calculateDotProduct(user1Orders, user2Orders, commonMenuIds);
  const magnitudeUser1 = calculateMagnitude(user1Orders, commonMenuIds);
  const magnitudeUser2 = calculateMagnitude(user2Orders, commonMenuIds);

  if (magnitudeUser1 === 0 || magnitudeUser2 === 0) {
    return 0; // 분모가 0이면 유사성 0
  }

  return dotProduct / (magnitudeUser1 * magnitudeUser2);
}

// 공통된 메뉴 아이디 추출
function getCommonMenuIds(user1Orders, user2Orders) {
  const user1MenuIds = user1Orders.map(order => order.menuID);
  const user2MenuIds = user2Orders.map(order => order.menuID);
  return [...new Set(user1MenuIds.filter(menuId => user2MenuIds.includes(menuId)))];
}

// Dot Product 계산
function calculateDotProduct(user1Orders, user2Orders, commonMenuIds) {
  return commonMenuIds.reduce((sum, menuId) => {
    const orderCountUser1 = getUserOrderCount(user1Orders, menuId);
    const orderCountUser2 = getUserOrderCount(user2Orders, menuId);
    return sum + orderCountUser1 * orderCountUser2;
  }, 0);
}

// 사용자가 특정 메뉴를 주문한 횟수 가져오기
function getUserOrderCount(userOrders, menuId) {
  const order = userOrders.find(order => order.menuID === menuId);
  return order ? order.order_count : 0;
}

// 벡터의 크기(Magnitude) 계산
function calculateMagnitude(userOrders, commonMenuIds) {
  return Math.sqrt(commonMenuIds.reduce((sum, menuId) => {
    const orderCount = getUserOrderCount(userOrders, menuId);
    return sum + orderCount * orderCount;
  }, 0));
}

// 상위 유사한 사용자들이 주문한 메뉴 중에서 가장 많이 주문된 메뉴 선택 함수
async function getMostOrderedMenu(topSimilarUsers, targetUserOrders) {
  const recommendedMenus = [];

  for (const similarUser of topSimilarUsers) {
    const userMenus = await prisma.menuOrderInfo.findMany({
      where: {
        userID: similarUser.userId,
      },
      select: {
        menuID: true,
        order_count: true,
      },
    });

    // 상위 사용자가 주문한 메뉴 중에서 가장 많이 주문된 메뉴 선택
    const mostOrderedMenu = userMenus.reduce((mostOrdered, menu) => {
      return menu.order_count > mostOrdered.order_count ? menu : mostOrdered;
    }, { order_count: 0 });

    // 이미 추천 목록에 있는 메뉴인지 확인
    const isAlreadyRecommended = recommendedMenus.some(menu => menu.menuID === mostOrderedMenu.menuID);

    // 해당 사용자가 주문한 적 없는 메뉴라면 추천 목록에 추가
    if (!isAlreadyRecommended && !targetUserOrders.some(order => order.menuID === mostOrderedMenu.menuID)) {
      recommendedMenus.push(mostOrderedMenu);
    }
  }

  // 가장 많이 주문된 메뉴 선택
  const mostOrderedMenu = recommendedMenus.reduce((mostOrdered, menu) => {
    return menu.order_count > mostOrdered.order_count ? menu : mostOrdered;
  }, { order_count: 0 });

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
      order_count: true,
    },
  });

  // 다른 사용자들의 주문 내역 가져오기
  const allUsersOrders = await prisma.menuOrderInfo.findMany({
    where: {
      userID: {
        not: targetUserId, // 대상 사용자 제외
      },
    },
    select: {
      userID: true,
      menuID: true,
      order_count: true,
    },
  });

  // 대상 사용자와 다른 사용자들 간의 유사성 측정
  const similarUsers = [];

  for (const userOrders of allUsersOrders) {
    const similarity = calculateCosineSimilarity(targetUserOrders, userOrders);
    similarUsers.push({ userId: userOrders.userID, similarity });
  }

  // 유사성이 높은 순서로 정렬
  similarUsers.sort((a, b) => b.similarity - a.similarity);

  // 상위 N개의 유사한 사용자 가져오기
  const topSimilarUsers = similarUsers.slice(0, N);

  // 상위 유사한 사용자들이 주문한 메뉴 중에서 가장 많이 주문된 메뉴 선택
  const mostOrderedMenu = await getMostOrderedMenu(topSimilarUsers, targetUserOrders);

  return mostOrderedMenu;
}

module.exports = { recommendMenuForUser };

