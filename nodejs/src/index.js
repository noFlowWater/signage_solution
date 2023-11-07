const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const port = 4000
const database = require('./database')

app.use(express.json());


//db 연결
database.$connect()
    .then(() => {
        console.log('연결완료');
    })
    .catch(err => {
        console.log(err);
    } )

//admin 관련 api 요청은 routes/admin 에서 처리
app.use('/admin', require('./routes/admin'));

// '/menu' 관련 api 요청은 routes/menu에서 처리
app.use('/menu', require('./routes/menu'));

// app.use('/api', require('./routes/api'));
// '/api' 관련 요청은 routes/api에서 처리 -> /api는 메뉴등록,수정,삭제 등을 <요청>함

app.use((error, req, res, next) => {
    res.status(error.status || 500); //express에서 제공하는 errorstatus가 있다면 그걸 클라이언트한테 보내주고 없다면 임의로 500을 보낸다
    res.send(error.message || '서버에서 에러가 났습니다'); //지정한 error msg가 있다면 그걸 전달하고 없다면 해당 메시지를 보낸다
})

app.listen(4000, () => {
    console.log(`${port}번에서 실행이 되었습니다.`);
})