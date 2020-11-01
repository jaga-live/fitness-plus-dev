
/// Timestamp To Date
const timestampToDate = (timestamp) => {

    var todate = new Date(timestamp).getDate();
    var tomonth = new Date(timestamp).getMonth() + 1;
    var toyear = new Date(timestamp).getFullYear();
    var original_date = tomonth + '-' + todate + '-' + toyear;
    return original_date
}




/// Timstamp to Time
const timestampToTime = (timestamp) => {

    var date = new Date(timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime


}



////Seconds between two date
const secBetweenDates = (start, end) => {
    start = new Date(start)
    end = new Date(end)

    var seconds = (end.getTime() - start.getTime()) / 1000;
    var hrs = ~~(seconds / 3600);
    var mins = ~~((seconds % 3600) / 60);
    var secs = ~~seconds % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + (mins <= 1 ? " minute" : " minutes") + " and " + (secs < 10 ? "0" : "");
    ret += "" + secs + " seconds";
    return ret;
}


module.exports = { timestampToDate, timestampToTime, secBetweenDates }