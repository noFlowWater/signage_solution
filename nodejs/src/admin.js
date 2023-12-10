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

createAdmin()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })