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

function judgeRepeat(main_cate_content, content_arr) {
    var checked = true
    for (var i = 0; i < content_arr.length; i++) {
        if (content_arr[i].innerText.slice(0, -5) == main_cate_content || content_arr[i].innerText.slice(0, -4) == main_cate_content) {
            checked = false
            alert("存在相同名稱,請善用編輯功能喔！")
        }
    }
    return checked
}

const otherBarAppear = () => {
    var optionForm = document.querySelector('.form-control');
    var option = optionForm.options[optionForm.selectedIndex].text;
    var otherInput = document.querySelector("#otherInput");
    if (option == "其他"){
        otherInput.classList.remove('disappear');
        } else {
            otherInput.classList.add('disappear');
        }
    }

modal.addEventListener("click", (e) => {
    var optionForm = document.querySelector('.form-control');
    var option = optionForm.options[optionForm.selectedIndex].text;
    var otherInput = document.querySelector("#otherInput");
    if (e.target.id == "savechange") {
        if (option == "其他"){
            var option = document.querySelector("#inputDefault").value;
            if (option == "" || option.trim() == ""){
                alert("please type in your cate name!")
                }
        }
        var main_cate_img = document.querySelector('input[name="cate_img"]:checked').value;
        var existed_content = document.getElementsByClassName("card-header")
        var checked = judgeRepeat(option, existed_content)
        if (checked == true){
            console.log(option)
            $.ajax({
                type: "GET",
                url: "/main_category?cate_text=" + option + "&cate_img=" + main_cate_img,
                dataType: "json",
                contentType: "application/json;charset=UTF-8",
                complete: function (data) {
                    var imgform = document.getElementsByName("cate_img");
                    for (var i = 0; i < imgform.length; i++) {
                        if (imgform[i].checked) {
                            var bgimage = imgform[i].nextElementSibling.src;
                        }
                    }
                    $("#cate_content").val("");
                    cardbox.innerHTML += `<div class="card border-secondary mb-3 float" style="max-width: 20rem;">
                                          <div class = "card-header"> ${option}
                                          <i class = "fas fa-edit"></i><i class="fas fa-trash-alt"></i><button type = "button"
                                          class = "btn btn-outline-danger floatright" onclick="window.location.href='/goods_table'">
                                          管理介面</button></div><div class="card-body overflow">
                                          <img src = "${bgimage}" alt = "" class = "cardsize photosize"></img>
                                          </div></div>`
                    modal.classList.remove("display");
                }
            })
        }
    }


})

