
document.getElementById('form').addEventListener('submit', function(e){
  // function sendInputToServer(){
  var date = new Date();
  var username = document.getElementById('username').value;
  var tweet = document.getElementById('tweet').value;
  var out = new XMLHttpRequest();
  out.onreadystatechange = function(){
    if (out.readyState === 4 && out.status === 200){
      //console.log(out.responseText);
      document.getElementById('display').innerHTML = out.responseText;
    }
  };
  out.open('POST', '/' + date + '/' + username + '/' + tweet);
  out.send();
// }
});
