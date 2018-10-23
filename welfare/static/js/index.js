const container = document.querySelector(".container-fluid");
var pictureRun = document.getElementById("pictureRun");
console.log(pictureRun);

// 跑一個迴圈
const picture1 = "https://images.pexels.com/photos/347140/pexels-photo-347140.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const picture2 = "https://images.pexels.com/photos/845413/pexels-photo-845413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const picture3 = "https://images.pexels.com/photos/220365/pexels-photo-220365.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940";
const pictureSource = [picture1, picture2, picture3];
var pictureRunNumber = 0;
var countTimes = 0;

setInterval(function () {
    if (pictureRunNumber > 2) {
        pictureRunNumber = 0;
    }
    pictureRun.src = pictureSource[pictureRunNumber];
    pictureRunNumber++;
    console.log(pictureRunNumber);
}, 3000);


container.addEventListener("click", (e) => {
    if (e.target.className == "carousel-control-next-icon nextBtn") {
        if (countTimes > pictureSource.length - 1) {
            countTimes = 0;
        }
        var picture = e.target.parentElement.parentElement.children[0].children[0].children[1];
        console.log(picture.src);
        picture.src = pictureSource[countTimes];
        countTimes++;
        console.log(countTimes);
    }

    if (e.target.className == "carousel-control-prev-icon") {
        countTimes--;
        if (countTimes < 0) {
            countTimes = 2;
        }
        var picture = e.target.parentElement.parentElement.children[0].children[0].children[1];
        console.log(picture);
        picture.src = pictureSource[countTimes];

        console.log(countTimes);

    }


})