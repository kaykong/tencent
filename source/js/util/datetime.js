var DateTimeUtil = {}

DateTimeUtil.getNowTime = function () {
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

/*
*
* time格式: "2017-08-08 10:22:34"
*
* */
DateTimeUtil.isToday = function (time) {

    let nowTime = this.getNowTime();

    try {
        return nowTime.split(" ")[0] == time.split(" ")[0];
    } catch (e) {
        return false;
    }
}

/*
*
* 如果是今天, 只返回 小时分钟秒
* 如果是今年, 返回 月-日 时间
* 如果不是今年 全部返回
*
* */
DateTimeUtil.getFormatDate = function (time) {

    let nowTime = this.getNowTime();

    try {
        let timeSplit = time.split(" ");
        let isToday = this.isToday(time); //年月日相等
        if (isToday) {
            return timeSplit[1];
        }

        //判断是否是今年
        let isThisYear = new Date().getFullYear() == timeSplit[0].split("-")[0];
        if (isThisYear) {
            //今年返回, 月-日 时间
            return time.substring(5);
        } else {
            return time;
        }

    } catch (e) {
        return time;
    }
}





