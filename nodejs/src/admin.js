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

const createAdmin = async () => {
    try {
        const user = await database.admin.upsert({
        where: {
            user_id : "817d8cb2-8813-4d8d-8ab5-8df3835e7ca5"
        },
        create : {
            password : "1111"
        },
        update : {user_id : "1"}
        });
        console.log('User created:', user);
    } catch (error) {
        console.error('Error creating user:', error);
    } 
};

createAdmin()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })