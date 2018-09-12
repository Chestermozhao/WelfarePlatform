window.onload = function(){
function checkemail(email) {
    emailRule = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;

    //validate ok or not
    if (email.search(emailRule) != -1) {
      document.getElementById("emailtype").style.display = "none";
    } else {
      document.getElementById("emailtype").style.display = "block";
    }
  }


function checkpwd(pwd) {
    if (!(pwd.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/))) {
      document.getElementById("caution").style.display = "block";
    } else {
      document.getElementById("caution").style.display = "none"
    }
  }



  var btn = document.getElementById("btn");
  btn.onclick = function validate(e) {
    var emailInput = document.getElementById('exampleInputEmail1');
    if (emailInput.value.trim() == '') {
      // Add a class that defines an animation
      emailInput.classList.add('error');

      // remove the class after the animation completes
      setTimeout(function () {
        emailInput.classList.remove('error');
      }, 300);

      e.preventDefault();
    }
    var password = document.getElementById('pwd');
    if (password.value.trim() == '') {
      // Add a class that defines an animation
      password.classList.add('error');

      // remove the class after the animation completes
      setTimeout(function () {
        password.classList.remove('error');
      }, 300);

      e.preventDefault();
    }
  }
}
