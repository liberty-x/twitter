var date = new Date();

// function preventingShit(){
  document.getElementById('form').addEventListener('submit', function(e){
    e.preventDefault();

  // function sendInputToServer(){
    var username = document.getElementById('username').value;
    var tweet = document.getElementById('tweet').value;
    var out = new XMLHttpRequest();
    out.onreadystatechange = function(){
      if (out.readyState === 4 && out.status === 200){
        //console.log(out.responseText);
        document.getElementById('display').innerHTML = out.responseText;
      }
    };
    out.open('POST', '/' + username + '/' + date + '/' + tweet);
    out.send();
  // }
  })
// }
