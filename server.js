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
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(index);
    } else if (url === '/allposts') {
      (function getData() {
        client.GET("tweetcount", function(err,reply){
          console.log("countERROR", err, "countOBJECT", reply);
          var endLength = reply;
          var startLength = reply - 5;
          client.LRANGE("dates", startLength, endLength, function(err,reply){
            console.log("datesERROR", err, "datesOBJECT", reply);
            var dates = reply;
            client.multi()

              .hgetall(dates[5])
              .hgetall(dates[4])
              .hgetall(dates[3])
              .hgetall(dates[2])
              .hgetall(dates[1])
              .hgetall(dates[0])

              .exec(function(err,replies){
                console.log(replies);
                res.write(JSON.stringify(replies));
                res.end();
              });
          });
        });
      }());
    } else if (url.indexOf('.') > -1) {
      var ext = url.split('.')[1];
      res.writeHead(200, {"Content-Type": "text/" + ext});
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
    client.incr('tweetcount', function(err, tweetCount){
      client.HMSET(date, ["username", username, "tweet", tweet], callback);
      client.RPUSH("dates", date);
    });
  }

  var create = function (){
    var server = http.createServer(handler);
    server.listen(port);
  };

  return {
    handler: handler,
    create: create,
    client: client,
    writingToDB: writingToDB
    //getData: getData
  };
}());

module.exports = serve;
