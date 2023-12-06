//시드 데이터 생성하는 코드
const express = require('express');
const app = express();
const cors = require('cors');
const database = require('./database')

app.use(express.json());
app.use(cors());


//db 연결
database.$connect()
    .then(() => {
        console.log('연결완료');
    })
    .catch(err => {
        console.log(err);
    } )

//category 시드 생성
async function category(){
    await database.category.upsert({
        where: {category_name : "추천"},
        update : {
            category_id : "0"
        },
        create : {
            category_name : "추천",
            category_id : "0"
        }
    })
    console.log("success")
}
//알러지 시드 생성 (21개)
async function allergy(){
    await database.allergy.createMany({
        data : [
            {allergy_name : "메밀"},
            {allergy_name : "밀"},
            {allergy_name : "대두"},
            {allergy_name : "호두"},
            {allergy_name : "땅콩"},
            {allergy_name : "복숭아"},
            {allergy_name : "토마토"},
            {allergy_name : "돼지고기"},
            {allergy_name : "난류"},
            {allergy_name : "우유"},
            {allergy_name : "닭고기"},
            {allergy_name : "쇠고기"},
            {allergy_name : "새우"},
            {allergy_name : "고등어"},
            {allergy_name : "홍합"},
            {allergy_name : "전복"},
            {allergy_name : "굴"},
            {allergy_name : "조개류"},
            {allergy_name : "게"},
            {allergy_name : "오징어"},
            {allergy_name : "아황산 포함식품"}
        ]
    })
}
async function allergy_edit(){
    await database.allergy.update({
        where : {allergy_name : "난류"},
        data : {
            allergy_name : "난류(가금류)"
        }
    })
}
//메뉴 시드 생성 (카테고리별로 하나씩)
async function menu(){
    //참치김밥
    await database.menu.upsert ({
        where : {menu_name : "참치김밥"},
        update : {},
        create : {
            menu_name : "참치김밥",
            menu_description : "참치가 들어간 김밥",
            price : 3000,
            file_path : "",
            is_soldout : false,
            category : {
                connect : {category_name : "김밥"}
            },
        }
    })
    await database.menu.upsert({
        where : {menu_name : "돈가스"},
        update : {
            allergy : {
                connect : {allergy_name : "밀"}
            }
        },
        create : {
            menu_name : "돈가스",
            menu_description : "돈가스",
            price : 6000,
            file_path : "",
            is_soldout : false,
            category : {
                connect : {category_name : "돈가스"}
            },
        }
    })
    await database.menu.upsert({
        where : {menu_name : "떡라면"},
        update : {},
        create : {
            menu_name : "떡라면",
            menu_description : "떡라면",
            price : 5000,
            file_path : "",
            is_soldout : false,
            category : {
                connect : {category_name : "라면"}
            },
        }
    })
    await database.menu.upsert({
        where : {menu_name : "떡볶이"},
        update : {},
        create : {
            menu_name : "치즈떡볶이",
            menu_description : "치즈가 들어간 떡볶이",
            price : 6000,
            file_path : "",
            is_soldout : false,
            category : {
                connect : {category_name : "떡볶이"}
            },
        }
    })
    await database.menu.upsert({
        where : {menu_name : "사이다"},
        update : {},
        create : {
            menu_name : "사이다",
            menu_description : "사이다",
            price : 1000,
            file_path : "",
            is_soldout : false,
            category : {
                connect : {category_name : "사이드"}
            },
        }
    })
    console.log("success");
}

//메뉴 알러지 연결
async function menutoallergy() {
    await database.relation_menu_allergy.create ({
        data : {
            menus : {
                connect : { menu_name : "떡라면"}
            },
            allergies : {
                connect : {allergy_name : "밀"},
            }
        }
    })
    console.log("success")
}
//함수 호출
allergy_edit()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })