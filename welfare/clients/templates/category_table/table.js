const container = document.querySelector(".container-fluid");
const reminder = document.getElementById("reminder");
const othersInput = document.getElementById("others");
const datePicker = document.getElementById("datepicker");
var tableBody = document.getElementById("tableBody");
// 送出事件
container.addEventListener("click", (e) => {
    if (e.target.className == "btn btn-outline-secondary addBtn") {
        var selectBox = document.getElementsByTagName("select");
        var selectedArray = [];
        for (let i = 0; i < selectBox.length - 1; i++) {
            var index = selectBox[i].selectedIndex;
            selectedArray.push(selectBox[i].options[index].value);
        }
        selectedArray.push(othersInput.value, datePicker.value);
        if (reminder.checked) {
            selectedArray.push("yes", document.getElementById("reminderTime").value);
        } else {
            selectedArray.push("no", "dontneedremind");
        }

        if (selectedArray[4] == "") {
            alert("請確實填入日期")
            return false
        }
        console.log(selectedArray);
        if (selectedArray[0] == "其他") {
            if (selectedArray[3] == "") {
                alert("請確實填寫其他")
                return false
            } else {
                var htmlTemplate = `
                <tr class = "table-active">
                    <th scope = "row">${selectedArray[3]}</th>
                    <td>${selectedArray[4]}</td> 
                    <td>${selectedArray[1]+selectedArray[2]}</td>
                    <td>${selectedArray[6]}</td>
                    </tr>
                `
                tableBody.innerHTML += htmlTemplate;
            }

        } else {
            var htmlTemplate = `
                <tr class = "table-active">
                    <th scope = "row">${selectedArray[0]}</th>
                    <td>${selectedArray[4]}</td> 
                    <td>${selectedArray[1] + selectedArray[2]}</td>
                    <td>${selectedArray[6]}</td>
                    </tr>
                `
            tableBody.innerHTML += htmlTemplate;
        }







    }
});





// datepicker
$(function () {
    $("#datepicker").datepicker();
});

// other顯示
const showOthers = (ele) => {
    if (ele.value == "其他") {
        document.getElementById("othersBox").style.display = "flex"
    } else {
        document.getElementById("othersBox").style.display = "none";
    };
}
// 出現提醒時間
const showAlertDate = (ele) => {
    if (ele.checked) {
        document.getElementById("alertTime").style.display = "flex";
    } else {
        document.getElementById("alertTime").style.display = "none";

    }
}