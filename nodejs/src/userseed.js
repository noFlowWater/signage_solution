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
    })

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
            {allergy_name : "난류(가금류)"},
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

//category 시드 생성
async function category(){
    await database.category.createMany({
        data : [
            {category_name : "추천", category_id : "0" },
            {category_name : "김밥", category_id : "1" },
            {category_name : "라면", category_id : "2" },
            {category_name : "떡볶이", category_id : "3" },
            {category_name : "돈가스", category_id : "4" },
            {category_name : "사이드", category_id : "5" }
        ]
    })
    console.log("success")
}

//admin 초기 계정 생성
const createAdmin = async () => {
    try {
        const user = await database.admin.create({
        data : {
            user_id : "1",
            password: "1111"
        }})
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    } 
};

//관리자 호출
createAdmin()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })
//카테고리 생성 함수 호출
allergy()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })

//알러지 생성 함수 호출
category()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })