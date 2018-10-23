var addbtn = document.getElementById("addbtn");
var cardbox = document.getElementById("cardbox");
var modal = document.getElementById("modal");
var savebtn = document.getElementById("savechange");
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

function judgeRepeat(main_cate_content,content_arr){
    var checked = true
    for (var i = 0; i< content_arr.length; i++){
        if (content_arr[i].innerText.slice(0,-5) == main_cate_content || content_arr[i].innerText.slice(0,-4) == main_cate_content){
            checked = false
            alert("存在相同名稱,請善用編輯功能喔！")
            }
        }
        return checked
    }

$(document).ready(function(){
    savebtn.onclick = function () {
        var main_cate_img = document.querySelector('input[name="cate_img"]:checked').value;
        var cate_content = document.getElementById("cate_content");
        var main_cate_content = cate_content.value;
        if (main_cate_content == "") {
            alert("請確實輸入")
        } else {
            var arr_content_box = document.getElementsByClassName("card-header")
            var checked = judgeRepeat(main_cate_content,arr_content_box)
            if (checked == true){
                    $.ajax({
                        type : "GET",
                        url : "/main_category?cate_text="+ main_cate_content +"&cate_img="+ main_cate_img,
                        dataType : "json",
                        contentType : "application/json;charset=UTF-8",
                        complete : function(data){
                            var imgform = document.getElementsByName("cate_img");
                            for (var i = 0; i < imgform.length; i++) {
                                if (imgform[i].checked) {
                                    var bgimage = imgform[i].nextElementSibling.src;
                                }
                            }
                            $("#cate_content").val("");
                            cardbox.innerHTML += `<div class="card border-secondary mb-3 float" style="max-width: 20rem;">
                                                  <div class = "card-header"> ${main_cate_content}<button type = "button"
                                                  class = "btn btn-outline-danger floatright"
                                                  onclick="window.location.href='/goods_table'">
                                                  管理介面</button></div><div class="card-body overflow">
                                                  <img src = "${bgimage}" alt = "" class = "cardsize photosize"></img>
                                                  </div>
                                                  </div>`
                            modal.classList.remove("display");
                    }
             })
           }
         }
       }
     })
