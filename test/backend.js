var test = require('tape');
var server = require('../server.js');
var shot = require('shot');

test("check server is running", function(t){
  shot.inject(server.handler, {method:'GET', url: '/'}, function(res){
    t.equal(res.statusCode, 200, "server is up and running");
    t.end();
  });
});
