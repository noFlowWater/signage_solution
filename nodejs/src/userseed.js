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




user()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await database.$disconnect()
    })