const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})
app.post("/", function(req, res){
  // https://를 붙여줘야함(브라우저에서는 입력하지 않아도 알아서 붙여주지만 이 node 모듈은 그렇게 해주지 않음)

  const query = req.body.cityName;
  const apiKey = "13927739ecf674f67eb0bc2ec796fc51";
  const unit = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?units="+ unit +"&q="+ query +"&appid="+ apiKey+"";
  https.get(url, function(response){

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = "http://openweathermap.org./img/wn/"+ icon +"@2x.png";
      //res.send()는 하나만 존재해야한다.
      // ""안에 h1태그를 붙여서 사용할 수 있다

      //res.write는 여러개 작성 가능
      res.write("<p>Weather is currently " + weatherDescription + "</p>");
      res.write("<h1>the temperature in "+ query +" is currently " + temp + "</h1>");
      res.write("<img src="+ imageURL+" >")
      res.send();
    })
  })
  console.log(req.body.cityName);
})


app.listen(3000, function(){
  console.log("Server is running on port 3000.")
})