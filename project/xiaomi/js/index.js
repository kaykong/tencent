window.onload = function () {

    let headerSearch = document.getElementsByClassName("header-search")[0];
    let keyWords = headerSearch.getElementsByClassName("search-key-words")[0];
    /*let i = 0;
    keyWords.onmouseout = function() {
      console.log("离开keyWordsList"+ i++);
    };*/


    let headerNavLiList = document.getElementsByClassName("Js-header-nav-li");
    for (let i = 0; i < headerNavLiList.length; i++) {
        headerNavLiList[i].onmouseover = function () {
            //输入框失去焦点(搜索框关键字列表隐藏)
            document.getElementsByClassName("search-txt")[0].blur();
            // document.getElementsByClassName("header-nav-menu")[0].style.display = "block";

        };
    }

    let imgList = document.getElementsByClassName("main")[0].getElementsByTagName("img");

    //获取main下的cycle-list下的cycle
    let cycleList = document.getElementsByClassName("main")[0]
                        .getElementsByClassName("cycle-list")[0]
                        .getElementsByClassName("cycle");

    var INDEX = 0;
    for (let i = 0; i < cycleList.length; i++) {
        //轮播图下方圆形按钮点击事件
        cycleList[i].onclick = function () {
            //获取圆形按钮index值
            let index = this.getAttribute("index");
            //圆形按钮 active
            for (let i = 0; i < cycleList.length; i++) {
                if (cycleList[i].getAttribute("index") == index) {
                    this.className = "cycle main-active";
                    INDEX = index;
                } else {
                    cycleList[i].className = "cycle";
                }
            }

            //图片显示
            for (let i = 0; i < imgList.length; i++) {
                if (imgList[i].getAttribute("index") == index) {
                    imgList[i].className = "imgOn";
                } else {
                    imgList[i].className = "";
                }
            }
        }

    }

    // 定时器, 5000ms执行一次cycleClick函数
    setInterval(cycleClick,5000);

    function cycleClick() {
        //圆形按钮 active
        for (let i = 0; i < cycleList.length; i++) {
            if (cycleList[i].getAttribute("index") == INDEX) {
                cycleList[i].className = "cycle main-active";
            } else {
                cycleList[i].className = "cycle";
            }
        }

        //图片显示
        for (let i = 0; i < imgList.length; i++) {
            imgList[i].className = "";
            if (imgList[i].getAttribute("index") == INDEX) {
                imgList[i].className = "imgOn";
            } else {
                imgList[i].className = "";
            }
        }

        INDEX++;
        if (INDEX == imgList.length) {
            INDEX = 0;
        }
    }


};