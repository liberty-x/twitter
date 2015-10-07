var iframe = document.getElementById('iframe');
var target = iframe.contentDocument || iframe.contentWindow.document;
var evt = document.createEvent("KeyboardEvent");

// to pass this test you need to hardcode a value of "Bob" into the input tag in index.html
test("username value logged", function(assert){
  var initial = target.getElementById('username').value;
  var result = (function pressEnter(e) {
      return initial;
      }(evt.initKeyboardEvent(13)));
  var expected = 'Bob';
  assert.equal(result,expected, "congrats!");
});

// to pass this test you need to hardcode a value of "Tweet here!" into the input tag in index.html
test("tweet value logged", function(assert){
  var initial = target.getElementById('tweet').value;
  var result = (function pressEnter(e) {
      return initial;
      }(evt.initKeyboardEvent(13)));
  var expected = 'Tweet here!';
  assert.equal(result,expected, "congrats!");
});

test("are the tweets being displayed?", function(assert){
  var initial = target.getElementsByTagName("li").length;
  var result = initial > 0;
  var expected = true;
  assert.equal(result,expected, "yes they are!");
});
