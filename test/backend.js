var test = require('tape');
var server = require('../server.js');
var shot = require('shot');

test("check server is running", function(t){

var request = {
  method:'GET',
  url: '/'
};

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, "server is up and running");
    t.end();
  });
});

test("check handler can process files ", function(t){

  var request = {
    method:'GET',
    url: '/public/style.css'
  };

  shot.inject(server.handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, "handler ready to process files!");
    t.end();
  });
});

test("Has the date been logged on database", function(t) {
  var request = {
    method:'POST',
    url: '/' + "1234" + '/' + "Ruth" + '/' + "Hello"
  };

  shot.inject(server.handler, request, function(res) {
    var result = res.payload;
    t.equal(result, 'OK', "success!")
    t.end();
    server.client.quit();
  })
})



// test("Does server receive post request", function(t){
//     shot.inject(server.handler, request, function(res){
//     var result = req.method
//     var expected = "POST"
//     t.equal(expected, result, "POST request recieved");
//     t.end();
//   });
// });
