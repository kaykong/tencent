var data;

var Ajax = {
    get: function (url, callback) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.setRequestHeader( 'Content-Type', 'application/json' );
        xhr.setRequestHeader( 'Access-Control-Allow-Origin', '*');
        xhr.withCredentials = false;
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    console.log(xhr.responseText);
                    callback(xhr.responseText);
                }
            }
        }
        xhr.send();
    },

    // data应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    post: function (url, data, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, false);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    // console.log(xhr.responseText);
                    callback(xhr.responseText);
                }
            }
        }
        xhr.send(data);
    }
}

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

            let dataKey = this.getAttribute("dataKey");
            let headerMenuData = data.headerMenu[dataKey];
            let menuUl = document.getElementsByClassName("header-nav-menu-list")[0];
            let menuHtml = "";
            // menuUl.innerHTML = "";
            for (let j = 0; j < headerMenuData.length; j++) {

                let li = document.createElement("li");
                if (j == 0) {
                    li.className = "first";
                }
                li.innerHTML = "<a href=\"javascript:;\">\n" +
                    "    <div>\n" +
                    "        <img src=\"" + headerMenuData[j].imgSrc + "\" alt=\"\">\n" +
                    "    </div>\n" +
                    "    <div class=\"title\">\n" +
                    "        " + headerMenuData[j].name + "\n" +
                    "    </div>\n" +
                    "    <p class=\"price\">" + headerMenuData[j].price + "</p>\n" +
                    "</a>";
                menuHtml += li.outerHTML;
                // menuUl.appendChild(li);
            }
            // data.headerMenu[dataKey];
            // console.log(menuHtml);
            menuUl.innerHTML = menuHtml;
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
    setInterval(cycleClick, 5000);

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
    getData();
};

function getData() {

    var url = "data.json"

    var request = new XMLHttpRequest();

    request.open("get", url);

    request.send(null);

    request.onload = function () {

        if (request.status == 200) {

            var json = JSON.parse(request.responseText);
            data = json;
            console.log(json);


            /* var ol = document.getElementById('ol');

             json.person.map(person => {

                 var li = document.createElement("li");

                 li.innerHTML = `名字是 ${person.name} 图片是 ${person.image}`;

                 ol.append(li);

             })*/

        }
    }
}