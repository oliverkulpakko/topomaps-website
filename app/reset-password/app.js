function submitForm()  { 
  let newPassword = document.getElementById("inputPassword").value;
  let newPasswordAgain = document.getElementById("inputPasswordAgain").value;

  if (newPassword !== newPasswordAgain) {
    alert('The passwords must match!');
    return
  }

  var xhr = new XMLHttpRequest();
  var url = "https://kulpakko.com/api/topomaps/users/passwords";
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      alert('Password changed successfully!');
      var json = JSON.parse(xhr.responseText);
      console.log(json);
    }
  };

  var data = JSON.stringify({
    "user": findGetParameter("user"),
    "resetToken": findGetParameter("token"),
    "newPassword": newPassword
  });

  xhr.send(data);

  return false;
}

function findGetParameter(parameterName) {
  var result = null,
    tmp = [];
  location.search
    .substr(1)
    .split("&")
    .forEach(function(item) {
      tmp = item.split("=");
      if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
  return result;
}
