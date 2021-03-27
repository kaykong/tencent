window.onload = function () {

    let imgListDiv = document.getElementsByClassName("icon")[0];
    let imgList = imgListDiv.getElementsByTagName("img");

    for (let i = 0; i < imgList.length; i++) {
        imgList[i].className = "";
    }
    let imgIndex = parseInt(Math.random() * imgList.length, 10) + 1;//生成 [1, imgList.length] 的随机数
    console.log(imgIndex);
    imgList[imgIndex - 1].className = "imgOn";

    /*let changeIcon = document.getElementsByClassName("changeIcon")[0];
    changeIcon.onclick = function () {
        alert("dianji");
    }*/

    let addBtn = document.getElementsByClassName("addBtn")[0];
    addBtn.addEventListener("touchstart", function () {
        this.className = "addBtn addBtnMobile";
    }, false);

    addBtn.addEventListener("touchmove", function () {
        this.className = "addBtn addBtnMobile";
    }, false);

    addBtn.addEventListener("touchend", function () {
        this.className = "addBtn";
    }, false);

};