$(function () {
	$("#datepicker").datepicker();
});
const container = document.querySelector(".container-fluid");
const addBtn = document.querySelector(".addBtn");
const tableBody = document.querySelector(".tableBody");
var modal = document.querySelector('.modal');

const classArray = ['tableBody', 'table-danger'];

function countDays(further) {
	var dt = new Date();
	var month = dt.getMonth() + 1;
	var day = dt.getDate();
	var year = dt.getFullYear();
	var todayDate = new Date(month + '-' + day + '-' + year);
	var furtherDate = new Date(further.value);
	minusDate = parseInt(Math.abs(todayDate - furtherDate) / 1000 / 60 / 60 / 24);
	return minusDate;
}

container.addEventListener("click", (e) => {
	if (e.target.className == 'btn btn-outline-secondary addBtn') {
		modal.style.display = "block";
	}




	if (e.target.className == "btn btn-primary saveBtn") {

		var typeInput = e.target.parentElement.previousElementSibling.childNodes[1].childNodes[3];
		var productNameInput = e.target.parentElement.previousElementSibling.childNodes[1].childNodes[7];
		var expiration = e.target.parentElement.previousElementSibling.childNodes[1].childNodes[11];
		var note = e.target.parentElement.previousElementSibling.childNodes[1].childNodes[15];
		// checkifnull(typeInput);
		// checkifnull(productNameInput);
		// checkifnull(expiration);
		// checkifnull(note);

		if (checkifnull(typeInput) && checkifnull(productNameInput) && checkifnull(expiration) && checkifnull(note)) {
			if (countDays(expiration) < 30) {
				tableBody.innerHTML += `
			<tr class = "table-danger">
				<th scope = "row">${typeInput.value}</th> 
				<td>${productNameInput.value}</td> 
				<td>${expiration.value}</td> 
				<td>${note.value}</td> 
			</tr>			
			`;
			} else {
				tableBody.innerHTML +=
					`<tr class="table-active">
				<th scope="row">${typeInput.value}</th>
				<td>${productNameInput.value}</td>
				<td>${expiration.value}</td>
				<td>${note.value}</td>
			</tr>			
			`
			}
		};
		modal.style.display = "none";
		typeInput.value = "";
		productNameInput.value = "";
		expiration.value = "";
		note.value = "";








	}
})


function checkifnull(field) {
	if (field.value !== "") {
		return true
	} else {
		return false
	};
}