window.onload = function () {

    let headerNavLiList = document.getElementsByClassName("Js-header-nav-li");

    for (let i = 0; i < headerNavLiList.length; i++) {
        //给每一个li绑定hover事件
        headerNavLiList[i].onmouseover = function () {
            // alert("hhh")
            let headerNavMenu = document.getElementsByClassName("header-nav-menu")[0];
            headerNavMenu.style.height = "200px";
            headerNavMenu.style.borderTop = "1px solid rgb(224, 224, 224)";
            headerNavMenu.style.boxShadow = "0 5px 3px rgba(0, 0, 0, .2)";
            console.log("1")

        };

        headerNavLiList[i].onmouseout = function () {
            // alert("hhh")
            let headerNavMenu = document.getElementsByClassName("header-nav-menu")[0];
            headerNavMenu.style.height = "0px";
            headerNavMenu.style.borderTop = "none";
            headerNavMenu.style.boxShadow = "none";
        };
    }

    let headerNavMenu = document.getElementsByClassName("header-nav-menu")[0];
    headerNavMenu.onmouseover = function () {
        this.style.height = "200px";
        this.style.borderTop = "1px solid rgb(224, 224, 224)";
        this.style.boxShadow = "0 5px 3px rgba(0, 0, 0, .2)";
    };
    headerNavMenu.onmouseout = function () {
        this.style.height = "0px";
        this.style.height = "0px";
        this.style.borderTop = "none";
        this.style.boxShadow = "none";
    };


    console.log(headerNavLiList)


};