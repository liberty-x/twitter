var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
console.log("Server running at http://localhost:" + port);
var server = http.createServer(handler).listen(port);
var redis  = require("redis");
var client = redis.createClient();

var index = fs.readFileSync(__dirname + '/public/index.html');

function handler(req,res){
  console.log(req.method);
  console.log(req.url);
  // function loadingPage(req,res){
    if (req.url === '/') {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(index);
    }
    else if (req.url.indexOf('.') > -1){
      var ext = req.url.split('.');
      res.writeHead(200,{"Content-Type": "text/" + ext[1]});
      res.end(fs.readFileSync(__dirname + req.url));
    }
    else if (req.url.indexOf('%') > -1) {
      var dataInputs = req.url.split('/');
      var date = dataInputs[1];
      var username = dataInputs[2];
      var tweet = dataInputs[3];
      client.HMSET(date, "username", username, "tweet", tweet);
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end();
    }
  // }
}
  // function sendToDB(req, callback){
  //   if (req.method === 'POST') {
  //     var body = '';
  //     req.on('data', function (dataChunk) {
  //         body += dataChunk;
  //     });
  //     req.on('end', function () {
  //
  //     });
  //   });




module.exports = handler;
