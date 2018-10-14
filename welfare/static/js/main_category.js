var addbtn = document.getElementById("addbtn");
var modal = document.getElementById("modal");
var savebtn = document.getElementById("savechange");
var cardbox = document.getElementById("cardbox");
var image = document.getElementsByTagName("img");
var closemodal = document.getElementById("closemodal");
var crossmodal = document.getElementById("crossmodal");
/*console.log(image);*/
addbtn.onclick = function () {
    modal.classList.add("display");
}
closemodal.onclick = function () {
    modal.classList.remove("display");
}
crossmodal.onclick = function () {
    modal.classList.remove("display");
}

$(document).ready(function(){
    savebtn.onclick = function () {
        var main_cate_img = document.querySelector('input[name="cate_img"]:checked').value;
        var cate_content = document.getElementById("cate_content");
        var main_cate_content = cate_content.value;
        if (main_cate_content == "") {
            alert("請確實輸入")
        } else {
            $.ajax({
                type : "GET",
                url : "/main_category?cate_text="+ main_cate_content +"&cate_img="+ main_cate_img,
                dataType : "json",
                contentType : "application/json;charset=UTF-8",
                complete : function(data){
                    var imgform = document.getElementsByName("cate_img");
                    //console.log(imgform[0].nextElementSibling.src);
                    for (var i = 0; i < imgform.length; i++) {
                        if (imgform[i].checked) {
                            var bgimage = imgform[i].nextElementSibling.src;
                        }
                    }
                    cardbox.innerHTML += `<div class="card border-secondary mb-3 float" style="max-width: 20rem;">
              <div class = "card-header"> ${main_cate_content}<button type = "button"
              class = "btn btn-outline-danger floatright">管理介面</button></div >
              <div class="card-body overflow">
                <img src = "${bgimage}" alt = "" class = "cardsize photosize"></img>
              </div>
            </div>`
                    main_cate_content.value = "";
                    modal.classList.remove("display");
            }
          })
       }
     }
   })

// < p class = "card-text" ></p >
