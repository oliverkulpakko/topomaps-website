if (Math.floor(Date.now() / 1000) > findGetParameter('expires_at')) {
  alert('The link that you followed has expired! Please get a new link and try again. Only the latest link will work.');
  window.location.href = '/';
}

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
    if (xhr.readyState === 4) {
      let json = JSON.parse(xhr.responseText);

      if (xhr.status === 200) {
        alert('Password changed successfully!');
        window.location.href = '/';
      } else {
        alert(json.status);
      }
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
  var result = null;
  var tmp = [];

  location.search.substr(1).split("&").forEach(function(item) {
    tmp = item.split("=");

    if (tmp[0] === parameterName) {
      result = decodeURIComponent(tmp[1]);
    }
  });

  return result;
}
