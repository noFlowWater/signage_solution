const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const database = require('./database')
const dotenv = require('dotenv');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extends: true}))

const port = process.env.PORT || 4000;
//db 연결
database.$connect()
    .then(() => {
        console.log('Connected');
    })
    .catch(err => {
        console.log(err);
    })

//admin 관련 api 요청은 routes/admin 에서 처리
app.use('/admin', require('./routes/admin'));

// '/menu' 관련 api 요청은 routes/menu에서 처리
app.use('/menu', require('./routes/menu'));

// 유저 알러지 매핑, 유저 주문 처리
app.use('/users',require('./routes/users'));

//image처리를 위한 경로 설정 받은 이미지 uploads 폴더에 저장
app.use(express.static('uploads'));
app.use(express.static(path.join(__dirname, '../uploads')))

app.use((error, req, res, next) => {
    res.status(error.status || 500); //express에서 제공하는 errorstatus가 있다면 그걸 클라이언트한테 보내주고 없다면 임의로 500을 보낸다
    res.send(error.message || 'Error in Server'); //지정한 error msg가 있다면 그걸 전달하고 없다면 해당 메시지를 보낸다
})

app.listen(port,'0.0.0.0', () => {
    console.log(`Server is running on port ${port}.`);
})