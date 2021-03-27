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
                    console.log("Ajax.get", xhr.responseText);
                    callback(xhr.responseText);
                }
            }
        };
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
        };
        xhr.send(data);
    }
};


function showMessages(data) {
    console.log(data);
}

window.onload = function () {

    let imgListDiv = document.getElementsByClassName("icon")[0];
    let imgList = imgListDiv.getElementsByTagName("img");

    for (let i = 0; i < imgList.length; i++) {
        imgList[i].className = "";
    }
    let imgIndex = parseInt(Math.random() * imgList.length, 10) + 1;//生成 [1, imgList.length] 的随机数
    imgList[imgIndex - 1].className = "imgOn";

    /*let changeIcon = document.getElementsByClassName("changeIcon")[0];
    changeIcon.onclick = function () {
        alert("dianji");
    }*/

    let addBtn = document.getElementsByClassName("addBtn")[0];
    /*addBtn.addEventListener("touchstart", function () {
        this.className = "addBtn addBtnMobile";
    }, false);

    addBtn.addEventListener("touchmove", function () {
        this.className = "addBtn addBtnMobile";
    }, false);

    addBtn.addEventListener("touchend", function () {
        this.className = "addBtn";
    }, false);*/

    Ajax.get("https://service-6qcrvxv3-1305383279.sh.apigw.tencentcs.com/release/mongoDB?methodName=getAllMessage", showMessages)
};