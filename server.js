var http = require('http');
var fs = require('fs');
var port = process.env.PORT || 8000;
console.log("Server running at http://localhost:" + port);
// var redis  = require("redis");
// var client = redis.createClient();

var index = fs.readFileSync(__dirname + '/public/index.html');
var myApp = makeHandler();

function makeHandler () {
  var middlewareStore = [];

  function handler (req,res) {
     var i = 0;
     console.log(req.method)
     middlewareStore[i](req,res,next);
     function next(){
      i++;
      middlewareStore[i](req,res,next);
     }
  }

  handler.add = function (fn) {
    middlewareStore.push(fn);
  };

  return handler;
}

myApp.add(function hello(req, res, next) {
  res.writeHead(200,{"Content-Type": "text/html"});
  res.write('<h1>Hello!</h1>');
  next();
});

myApp.add(function bye(req, res, next) {
  res.write('<h1>Bye!!!</h1>');
  res.end();
});

var server = http.createServer(myApp).listen(port);
