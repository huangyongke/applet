const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = function (date, format) {
  var paddNum = function (num) {
    num += "";
    return num.replace(/^(\d)$/, "0$1");
  }
  //指定格式字符
  var cfg = {
    yyyy: date.getFullYear() //年 : 4位
    , yy: date.getFullYear().toString().substring(2)//年 : 2位
    , M: date.getMonth() + 1  //月 : 如果1位的时候不补0
    , MM: paddNum(date.getMonth() + 1) //月 : 如果1位的时候补0
    , d: date.getDate()   //日 : 如果1位的时候不补0
    , dd: paddNum(date.getDate())//日 : 如果1位的时候补0
    , hh: date.getHours()  //时
    , HH: paddNum(date.getHours())
    , mm: paddNum(date.getMinutes()) //分
    , ss: date.getSeconds() //秒
  }
  format || (format = "yyyy-MM-dd hh:mm:ss");
  return format.replace(/([a-z])(\1)*/ig, function (m) { return cfg[m]; });
}

// 显示繁忙提示
var showBusy = text => wx.showToast({
    title: text,
    icon: 'loading',
    duration: 10000
})

// 显示成功提示
var showSuccess = text => wx.showToast({
    title: text,
    icon: 'success'
})

// 显示失败提示
var showModel = (title, content) => {
    wx.hideToast();

    wx.showModal({
        title,
        content: JSON.stringify(content),
        showCancel: false
    })
}

module.exports = { formatTime, formatDate, showBusy, showSuccess, showModel }
