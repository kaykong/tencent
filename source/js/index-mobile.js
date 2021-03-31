var interfaceUrlPre = "https://service-6qcrvxv3-1305383279.sh.apigw.tencentcs.com/release/mongoDB?methodName=";

var Ajax = {
    get: function (url, callback, async) {
        // XMLHttpRequest对象用于在后台与服务器交换数据
        var xhr = new XMLHttpRequest();
        if (!async) {
            async = false;
        }
        xhr.open('GET', url, async);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
        xhr.withCredentials = false;
        xhr.onreadystatechange = function () {
            // readyState == 4说明请求已完成
            if (xhr.readyState == 4) {
                if (xhr.status == 200 || xhr.status == 304) {
                    // console.log("Ajax.get", xhr.responseText);
                    callback(xhr.responseText);
                }
            }
        };
        xhr.send();
    },

    // data应为'a=a1&b=b1'这种字符串格式，在jq里如果data为对象会自动将对象转成这种字符串格式
    // data 为json格式
    post: function (url, data, callback, async) {

        data = JSON.stringify(data);
        if (!async) {
            async = false;
        }

        var xhr = new XMLHttpRequest();
        xhr.open('POST', url, async);
        // 添加http头，发送信息至服务器时内容编码类型
        xhr.setRequestHeader('Content-Type', 'application/json');
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

var urlEncode = function (param, key, encode) {
    if (param == null) return '';
    var paramStr = '';
    var t = typeof (param);
    if (t == 'string' || t == 'number' || t == 'boolean') {
        paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
    } else {
        for (var i in param) {
            var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i);
            paramStr += urlEncode(param[i], k, encode);
        }
    }
    return paramStr;
};


function showMessages(data) {

    data = JSON.parse(data);
    console.log("showMessages1", data);

    let agreeIdList = localStorage.agreeIdList;
    console.log("showMessages", "agreeIdList", agreeIdList);

    // console.log("showMessages2", data.respCode);
    // console.log("showMessages3", data.body);
    if (data && data.respCode == 200 && data.body) {
        //调用成功
        let msgListInnerHtml = "";
        for (let i = 0; i < data.body.length; i++) {
            let item = data.body[i];

            let newMsg = document.createElement("div");
            newMsg.className = "msg-item";


            let iconSpanHtml =
                "<span class=\"iconfont icon-zan2\" onclick=agree(this,'" + item._id + "')><span></span></span>\n";

            if (item.count && item.count > 0) {
                if (agreeIdList && agreeIdList.indexOf(item._id) >= 0) {
                    // console.log("index", agreeIdList.indexOf(item._id))
                    iconSpanHtml = "<span class=\"iconfont icon-zanmianxing\" onclick=agree(this,'" + item._id + "')>" + "<span> " + item.count + "</span>" + "</span>\n";
                } else {
                    iconSpanHtml = "<span class=\"iconfont icon-zan2\" onclick=agree(this,'" + item._id + "')>" + "<span> " + item.count + "</span>" + "</span>\n";
                }
            }

            newMsg.innerHTML =
                "<div class=\"msg-item clearfix\">\n" +
                "    <div class=\"msg-item-left \">\n" +
                "        <img class=\"imgOn\" src=\"" + item.imgUrl + "\" alt=\"\">\n" +
                "    </div>\n" +
                "    <div class=\"msg-item-right\">\n" +
                "        <div class=\"nickname\">\n" +
                "            " + item.name + "\n" +
                "        </div>\n" +
                "        <div class=\"content\">\n" +
                "            " + item.message + "\n" +
                "        </div>\n" +
                "        <div class=\"msg-item-right-bottom\">\n" +
                "            <div class=\"time\">\n" +
                "                " + item.createTime + "\n" +
                "            </div>\n" +
                iconSpanHtml +
                // "            <span class=\"iconfont icon-zan2\" onclick=agree(this,'" + item._id + "')></span>\n" +
                "        </div>\n" +
                "    </div>\n" +
                "</div>";
            msgListInnerHtml += newMsg.outerHTML;
        }
        // console.log("msgListInnerHtml", msgListInnerHtml);

        let msgListDiv = document.getElementsByClassName("message-list")[0];
        msgListDiv.innerHTML = msgListInnerHtml;
    }

}

function agree(this_, id) {
    // console.log(iconSpan)
    let className = this_.className;

    // console.log(this_.innerHTML)
    let agreeCountHtml = this_.getElementsByTagName("span")[0]; //点赞数html
    let count = 0;
    if (agreeCountHtml.innerHTML != "") {
        count = parseInt(agreeCountHtml.innerHTML);
        // console.log("count", count)
    }

    let agreeIdList = localStorage.agreeIdList;

    // agreeIdList = "['1', '2']";
    // agreeIdList = JSON.parse(agreeIdList);
    // console.log(agreeIdList)
    if (agreeIdList == null) {
        // alert(null)
        agreeIdList = "";
    } else {
        agreeIdList = agreeIdList.split(",");
    }


    let methodName = "agree";

    // alert(className);

    let agreeIdListNew = "";
    if (className.indexOf("icon-zanmianxing") >= 0) {
        //取消点赞
        // alert("取消点赞");
        methodName = "cancelAgree";
        this_.className = "iconfont icon-zan2";
        count--;
        if (count > 0) {
            // "<span> "+count+"</span>"
            // this_.innerHTML = " " + count;
            this_.innerHTML = "<span> " + count + "</span>";
        } else {
            this_.innerHTML = "<span></span>";
        }
        this_.style.animation = "none";


        for (let i = 0; i < agreeIdList.length; i++) {
            if (agreeIdList[i] != id) {
                agreeIdListNew += agreeIdList[i] + ",";
            }
        }
        //去掉末尾的逗号
        agreeIdListNew = agreeIdListNew.substring(0, agreeIdListNew.length - 1);
    } else {
        //点赞
        // alert("点赞")
        this_.className = "iconfont icon-zanmianxing";
        //animation: 1s bigAgree;
        this_.style.animation = "1s bigAgree";
        count++;
        this_.innerHTML = "<span> " + count + "</span>";
        //查找id是否已存在
        let check = false;
        for (let i = 0; i < agreeIdList.length; i++) {
            if (agreeIdList[i] == id) {
                check = true;
            } else {
                agreeIdListNew += agreeIdList[i] + ",";
            }
        }
        if (!check) {
            agreeIdListNew += id;
        }
    }
    localStorage.agreeIdList = agreeIdListNew;

    let data = {
        id: id
    }
    Ajax.post(
        interfaceUrlPre + methodName,
        data,
        function (data) {
            console.log("Ajax.post." + methodName, data);
            /*if (data) {
                data = JSON.parse(data);
            }*/
        }, true);
    // Ajax.post(interfaceUrlPre + "agree");
}

function getNowTime() {
    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();


    function getFull(data) {
        if (data < 10) {
            data = "0" + data;
        }
        return data;
    }

    let time = year + "-" + getFull(month) + "-" + getFull(day) + " " + getFull(hours) + ":" + getFull(minutes) + ":" + getFull(seconds);
    return time;
}

window.onload = function () {

    console.log("localStorage");
    console.log(localStorage.name);
    console.log(localStorage.content);
    console.log(localStorage.nowTime);


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


    let jsIcon = document.getElementsByClassName("JS-icon")[0];
    jsIcon.onclick = function () {
        for (let i = 0; i < imgList.length; i++) {
            imgList[i].className = "";
        }

        imgIndex = parseInt(Math.random() * imgList.length, 10) + 1;//生成 [1, imgList.length] 的随机数
        imgList[imgIndex - 1].className = "imgOn";
    };

    let addBtn = document.getElementsByClassName("addBtn")[0];


    addBtn.onclick = function () {


        //获取昵称, 获取content
        let loader = document.getElementsByClassName("loader")[0];
        //loader.style.display = "block";


        /*setTimeout(function () {
            loader.style.display = "none";
        }, 2000)*/

        let nickName = document.getElementById("nickname-input").value;
        let contentDiv = document.getElementById("content-input");
        let content = document.getElementById("content-input").value;
        let nowTime = getNowTime();
        let imgUrl = "";
        if (imgIndex < 10) {
            imgUrl = "./source/img/msg/img00" + imgIndex + ".jpg";
        } else {
            imgUrl = "./source/img/msg/img0" + imgIndex + ".jpg";
        }
        console.log(nickName, content);

        if (nickName == "") {
            alert("请填写昵称");
            return;
        }

        if (content == "") {
            alert("请填写留言");
            return;
        }

        if (localStorage.content == content) {
            alert("换句话呗");
            return;
        }

        localStorage.name = nickName;
        localStorage.content = content;
        localStorage.nowTime = nowTime;


        let data = {
            "name": nickName,
            "message": content,
            "createTime": nowTime,
            "imgUrl": imgUrl
        };
        addBtn.disabled = "true";
        this.innerHTML = "<div class=\"loader\"></div>";
        Ajax.post(
            interfaceUrlPre + "insertOneMessage",
            data,
            function (data) {
                // console.log("Ajax.post", data);

                addBtn.innerHTML = "提交";
                addBtn.disabled = "";

                if (data) {
                    data = JSON.parse(data);
                }

                if (data && data.respCode == 200 && data.body && data.body.insertedId) {
                    let firstMsgItem = document.getElementsByClassName("msg-item")[0];
                    let newMsg = document.createElement("div");
                    newMsg.className = "msg-item";
                    newMsg.innerHTML =
                        "<div class=\"msg-item clearfix\">\n" +
                        "    <div class=\"msg-item-left \">\n" +
                        "        <img class=\"imgOn\" src=\"" + imgUrl + "\" alt=\"\">\n" +
                        "    </div>\n" +
                        "    <div class=\"msg-item-right\">\n" +
                        "        <div class=\"nickname\">\n" +
                        "            " + nickName + "\n" +
                        "        </div>\n" +
                        "        <div class=\"content\">\n" +
                        "            " + content + "\n" +
                        "        </div>\n" +
                        "        <div class=\"msg-item-right-bottom\">\n" +
                        "            <div class=\"time\">\n" +
                        "                " + nowTime + "\n" +
                        "            </div>\n" +
                        "            <span class=\"iconfont icon-zan2\" onclick=agree(this,'" + data.body.insertedId + "')><span></span></span>\n" +
                        "        </div>\n" +
                        "    </div>\n" +
                        "</div>";

                    // firstMsgItem.parentNode.firstElementChild
                    //在开头插入节点
                    firstMsgItem.parentNode.insertBefore(newMsg, firstMsgItem);
                    contentDiv.value = "";
                } else {
                    alert("提交失败了");
                }


            }, true);

    };


    Ajax.get(interfaceUrlPre + "getAllMessage", showMessages, true);
};