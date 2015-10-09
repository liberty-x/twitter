var serve = (function() {
  var http = require('http');
  var fs = require('fs');
  var port = process.env.PORT || 8000;
  console.log("Server running at http://localhost:" + port);

  var redis = require("redis");
  var client = redis.createClient(process.env.REDIS_URL, {no_ready_check: true});

  var index = fs.readFileSync(__dirname + '/public/index.html');

  function handler(req, res) {
    var url = req.url;
    console.log(req.method);
    console.log(url);
    if (url === '/') {
      var date =  '0920150841240100';

      (function getData() {
        client.hgetall(date, function (err, obj) {
          console.log("GETERROR", err, "GETOBJECT", obj)
          console.dir(obj);
          res.writeHead(200, {"Content-Type": "text/html"});
          res.write(index);
          res.end(JSON.stringify(obj));
        });
      }());
    } else if (url.indexOf('.') > -1) {
      var ext = url.split('.')[1];
      res.writeHead(200, {
        "Content-Type": "text/" + ext
      });
      res.end(fs.readFileSync(__dirname + url));
    } else if (req.method === 'POST') {
      var dataInputs = url.split('/');
      var date = dataInputs[1];
      var username = dataInputs[2];
      var tweet = dataInputs[3];

      writingToDB(date, username, tweet,function(err, reply){
        console.log("ERROR", err, "REPLY", reply);
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(reply);
      });
    }
  }

  function writingToDB(date, username, tweet, callback) {
    client.HMSET(date, ["username", username, "tweet", tweet], callback);
  }






    //var resonse = client.hgetall(date)
  // //  return date;
  //   var response = client.HGETALL(date)
  // //  console.log(response)

  var create = function (){
    var server = http.createServer(handler);
    server.listen(port);
  }

  return {
    handler: handler,
    create: create,
    client: client,
    writingToDB: writingToDB
    //getData: getData
  }
}());

module.exports = serve;
