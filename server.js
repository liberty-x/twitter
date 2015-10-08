var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
// console.log("Server running at http://localhost:" + port);
var server = http.createServer(handler).listen(port);
var redis  = require("redis");
var client = redis.createClient();
var index = fs.readFileSync(__dirname + '/public/index.html');

function handler(req,res){
  var url = req.url;
  // console.log(req.method);
  // console.log(url);
  if (url === '/') {
    res.writeHead(200, {"Content-Type": "text/html"});
    res.end(index);
  }
  else if (url.indexOf('.') > -1){
    var ext = url.split('.')[1];
    res.writeHead(200,{"Content-Type": "text/" + ext});
    res.end(fs.readFileSync(__dirname + url));
  }
  else if (req.method === 'POST'){
    var dataInputs = url.split('/');
    var date = dataInputs[1];
    var username = dataInputs[2];
    var tweet = dataInputs[3];

    writingToDB(date,username,tweet, getData);

    res.writeHead(200, {"Content-Type": "text/html"});
    res.end("hi");
  }

}

function writingToDB(date, username, tweet,callback){
  client.HMSET(date, "username", username, "tweet", tweet);
  callback(date);
}

function getData(date){
  console.log(date);
  var response = client.HGETALL(date)
  console.log(response)
}
}

module.exports = handler;
