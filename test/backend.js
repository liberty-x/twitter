var test = require('tape');
var handler = require('../server.js');
var shot = require('shot');

test("check server is running", function(t){

var request = {
  method:'GET',
  url: '/'
};

  shot.inject(handler, request, function(res){
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

  shot.inject(handler, request, function(res){
    var result = res.statusCode;
    var expected = 200;
    t.equal(expected, result, "handler ready to process files!");
    t.end();
  });
});

//third test

// test("check handler returns correct files ", function(t){
//   var result =
// })


// if (req.url.indexOf('%') > -1) {
//   test("Does server receive post request when submit button is pressed", function(t){
//     t.equal(req.method, "POST", "POST request received");
//     t.end();
//   })
// }
