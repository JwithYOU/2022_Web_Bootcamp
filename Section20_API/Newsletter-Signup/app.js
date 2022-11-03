const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// 업데이트 여부

// 서버가 CSS 및 정적파일을 제공하려면 express.stactic을 활용해서 사용할 수 있다.
app.use(express.static("public"));

// html에서 post로 넘겨준 데이터를 받기위해서는 body-parser가 필요하다.
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",function(req, res){
  const fName = req.body.firstName;
  const lName = req.body.lastName;
  const email = req.body.email;

  console.log(fName, lName, email);
});

app.listen(3000, function(){
  console.log("Server is running on port 3000");
});