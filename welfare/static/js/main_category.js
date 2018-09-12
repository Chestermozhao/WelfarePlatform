var addbtn = document.getElementById("addbtn");
var modal = document.getElementById("modal");
var savebtn = document.getElementById("savechange");
var cardbox = document.getElementById("cardbox");
var image = document.getElementsByTagName("img");
var closemodal = document.getElementById("closemodal");
var crossmodal = document.getElementById("crossmodal");
console.log(image);
addbtn.onclick = function () {
    modal.classList.add("display");
}
closemodal.onclick = function () {
    modal.classList.remove("display");
}
crossmodal.onclick = function () {
    modal.classList.remove("display");
}
savebtn.onclick = function () {
    var input = document.getElementById("inputSmall");
    var inputvalue = input.value;
    if (inputvalue == "") {
        alert("請確實輸入")
    } else {
        var imgform = document.getElementsByName("chooseimg");
        console.log(imgform[0].nextElementSibling.src);
        for (var i = 0; i < imgform.length; i++) {
            if (imgform[i].checked) {
                var bgimage = imgform[i].nextElementSibling.src;
            }
        }
        cardbox.innerHTML += `<div class="card border-secondary mb-3 float" style="max-width: 20rem;">
  <div class = "card-header"> ${inputvalue}<button type = "button"
  class = "btn btn-outline-danger floatright">管理介面</button></div >
  <div class="card-body overflow">
    <img src = "${bgimage}" alt = "" class = "cardsize photosize"></img>
  </div>
</div>`
        input.value = "";
        modal.classList.remove("display");
    }

}

// < p class = "card-text" ></p >