// npm init -y
// npm i express
//node index.js

//import: 번들링하는 webpack이 있어야 쓰기 가능(webpack은 'npx create-react-app 프로젝트명' 명령어를 쓰면 자동으로 설치됨)
//require: 그냥 쓸 수 있음 // 현재 server폴더는 'npx create-react-app server'로 만든 게 아니므로 import, export 못 씀. require쓰삼
const express = require('express');
const cors = require('cors'); //npm i cors //cors 에러 막기위해 설치
const fs = require('fs'); //이미 express에 있던 거라 다운 안해도 됨
const bodyParser = require('body-parser');
const { log } = require('console'); 
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false })); // form에서 action속성으로 넘어온 body(post의 그 body)내용을 얻기 위함(false는 원래 써줘야 함)
app.use(bodyParser.json()); // body에 있는 json객체를 넘어오기 위함

const data = {
    select: function(){
        return JSON.parse(fs.readFileSync('./test.json'));
    },
    insert: function(newObj){
        const jsonData = data.select(); // 현재 test.json 내용 객체배열 가져오기
        // let newData = [...jsonData, {id:jsonData.length+1, ...newObj  }]
        let today = new Date();
        let newData = [...jsonData, {id: today.getTime(), ...newObj  }]
        fs.writeFileSync('./test.json',JSON.stringify(newData) );
        return newData;
    },
    update: function(){

    },
    delete: function(){

    }
}//data 객체

//1.)
                        //req 프론트엔드에서 요청받은 거(param, query 등등
                        //res 서버의 여러 함수를 사용하기 위함(이벤트 함수의 e랑 비슷한 거))
// app.get('/abc', function (req, res) {
//     const jsonData = fs.readFileSync('./test.json'); //fs.readFileSync() 이거 작업 완료 될 때까지 다음 실행 ㄴㄴ

//     //여기에 콘솔창 출력하면 터미너에서 출력됨
//     //console.log('req', req.query); //query로 들어옮 //ex-front 새로고침

//     // res.send( jsonData ); // send()로 보내진 게 화면에 출력되고 이걸 ex-front에서 가져가는 거
//     res.send( JSON.parse(jsonData) ); // JSON.parse() json문자열 -> js객체
//     // res.send({id: 1, name: 'chse'});
// }); 

// //2.)
// app.get('/abc/:id', function (req, res) { 
//     const jsonData = fs.readFileSync('./test.json'); 
//     const data = JSON.parse(jsonData); //json문자열 -> js객체
//     const {id} = req.params;
//     const aaa = data.filter(n => n.id == id);
//     res.send( aaa );
// }); 

// app.post('/insert', function (req, res) { // post는 url이 아닌 body로 데이터가 들어옮
//     // console.log('req', req);
//     // console.log('req.body', req.body);
//     // fs.writeFileSync('./test.json', {id:3, name:'홍길동'}); //json은 ""(이중 따옴표 필요)
//     // fs.writeFileSync( './test.json',JSON.stringify({id:3, name:'홍길동'}) ); //JSON.stringify() json형식의 문자열로 바꿔주는 애
    
//     const jsonData = fs.readFileSync('./test.json')
    
//     let data = [{id: jsonData.length+1, ...req.body}]
    
//     fs.writeFileSync( './test.json',JSON.stringify(req.body) ); 
//     res.send('성공');//send를 빼먹으면 새로고침 뱅글뱅글돌림 //꼭 써주삼
// });
// app.listen(3000); //localhost:3000 //값 바꾸면 서버끊었다가 다시 실행


// app.post('/insert', function (req, res) { // post는 url이 아닌 body로 데이터가 들어옮
   
//     const jsonData = JSON.parse( fs.readFileSync('./test.json') ); //json에 가져온 데이터를 배열, 객체 형식으로 바꾸고
    
//     let data = [...jsonData, {id:jsonData.length+1, ...req.body  }]
    
//     fs.writeFileSync('./test.json',JSON.stringify(data)   );
//     res.send('성공');
// });
// app.listen(3000); 



app.get('/abc', function (req, res) {  
    res.send( data.select() ); // 현재 test.json 내용 객체로 보내기
});
  
app.delete('/abc/:id', function (req, res) {

    const jsonData = data.select(); //현재 test.json의 내용 객체배열로 가져옮
    const {id} = req.params;
    const delData = jsonData.filter(n=> n.id != id) // id에 해당하는 객체를 배열 aaa에 가져옮

    fs.writeFileSync('./test.json',JSON.stringify(delData) );
    res.send(  delData  )
});

app.post('/insert', function (req, res) {
    res.send(data.insert(req.body));
});



app.listen(3000);













//server - 서버단
//ex-front - 프론트단
// npx create-react-app ex-front //프론트단 만들기







//axios에서
// get, delete 는 body불필요
// put, post는 body 필요 (뒤에 {} 안에 들어오는 거 )

//이처럼 서버에서도 post쓸 때 body를 받는데, body가 들어올려면 npm i body-parser을 설치해야 함




//----- ----- ----- ----- ----- ----- ----- ----- ----- -----
/* 
server
ㄴ npm init -y(노드환경구축)
ㄴ npm i express cors nodemon(서버설치)
ㄴ index.js(express 모듈활용, cors사용)
ㄴ node index.js(서버구동 - localshot: 3030)
ㄴ npx nodemon index.js (실시간 업데이트)

ㄴ json파일 생성
ㄴ index.js(fs모듈활용 - readFileSync, writeFileSync)

write
ㄴ npm i body-parser

front
ㄴ axios(http://localshot:3030) 서버요청
*/