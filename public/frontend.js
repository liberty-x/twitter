
document.getElementById('form').addEventListener('submit', function(e){
  e.preventDefault();
  var date = new Date().toString();
  var username = document.getElementById('username').value;
  var tweet = document.getElementById('tweet').value;
  date = date.replace(/[^0-9]/gi, "");

  var out = new XMLHttpRequest();
  out.onreadystatechange = function(){
    if (out.readyState === 4 && out.status === 200){
      //console.log(out.responseText)
      if (out.responseText === 'OK')
        var node = document.createElement("div");
        var node2 = document.createElement("div");
        var textnode = document.createTextNode(tweet);
        var textnode2 = document.createTextNode(username);
        node.appendChild(textnode);
        node2.appendChild(textnode2);
        document.getElementById("results").appendChild(node2);
        document.getElementById("results").appendChild(node);
      }
  };
  out.open('POST', '/' + date + '/' + username + '/' + tweet);
  out.send();
});

(function pageLoad () {
  var out = new XMLHttpRequest();
  out.onreadystatechange = function() {
    if (out.readyState === 4 && out.status === 200) {
      console.log(out.responseText);
      var replies = JSON.parse(out.responseText);
      replies.map(postReplies)
      console.log(replies[0]);
    }
  };
  out.open('GET', '/allposts');
  out.send();
}());

function postReplies(reply){
  var node = document.createElement("div");
  var node2 = document.createElement("div")
  var textnode = document.createTextNode(reply.tweet);
  var textnode2 = document.createTextNode(reply.username);
  node.appendChild(textnode);
  node2.appendChild(textnode2);
  document.getElementById("database").appendChild(node2)
  document.getElementById("database").appendChild(node);
}
