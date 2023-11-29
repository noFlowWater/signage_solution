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

async function user(){
    //참치김밥
    await database.user.upsert ({
        where : {user_id : "2"},
        update : {},
        create : {
            user_id : "2",
            user_name : "오제덕",
            phoneNumber : "010-1234-5678",

        }
    }),
    await database.user.upsert ({
        where : {user_id : "3"},
        update : {},
        create : {
            user_id : "3",
            user_name : "윤석열",
            phoneNumber : "010-2222-2222",
            
        }
    })
    await database.user.upsert ({
        where : {user_id : "4"},
        update : {},
        create : {
            user_id : "4",
            user_name : "윤성섭",
            phoneNumber : "010-3556-7694",
            
        }
    })

    await database.user.upsert ({
        where : {user_id : "5"},
        update : {},
        create : {
            user_id : "5",
            user_name : "오구라 유나",
            phoneNumber : "010-5536-3536",
            
        }
    })

    await database.user.upsert ({
        where : {user_id : "6"},
        update : {},
        create : {
            user_id : "6",
            user_name : "김진섭",
            phoneNumber : "010-3333-3333",
            
        }
    })

    await database.user.upsert ({
        where : {user_id : "7"},
        update : {},
        create : {
            user_id : "7",
            user_name : "전두광",
            phoneNumber : "010-0518-1212",
            
        }
    })

    await database.user.upsert ({
        where : {user_id : "8"},
        update : {},
        create : {
            user_id : "8",
            user_name : "박지환",
            phoneNumber : "010-2807-1320",
        }
    })
}

user()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })