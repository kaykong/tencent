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
            //输入框失去焦点(关键字列表隐藏)
            document.getElementsByClassName("search-txt")[0].blur();
        };
    }





};