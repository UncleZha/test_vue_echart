var axios = require("axios");
//设置cookie
export function setCookie(name, value) {
  var Days = 30;
  var exp = new Date();
  exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
  document.cookie =
    name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//读取cookies
export function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

  if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
  else return null;
}
//删除cookies
export function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}

export function setSession(key, value) {
  sessionStorage.setItem(key, value);
}
export function getSession(key) {
  return sessionStorage.getItem(key);
}
export function delSession(key) {
  return sessionStorage.removeItem(key);
}

export function setLocalStg(key, value) {
  localStorage.setItem(key, value);
}
export function getLocalStg(key) {
  return localStorage.getItem(key);
}
export function removeLocalStg(key) {
  localStorage.removeItem(key);
}

export function queryURLParameter(str = location.href) {
  var reg = /([^?&=#]+)=([^?&=#]+)/g,
    obj = {};
  str.replace(reg, function() {
    obj[arguments[1]] = arguments[2];
  });
  return obj;
}

export function notBack() {
  var XBack = {};
  (function(XBack) {
    XBack.STATE = "x - back";
    XBack.element;

    XBack.onPopState = function(event) {
      event.state === XBack.STATE && XBack.fire();
      XBack.record(XBack.STATE); //初始化事件时，push一下
    };

    XBack.record = function(state) {
      history.pushState(state, null, location.href);
    };

    XBack.fire = function() {
      var event = document.createEvent("Events");
      event.initEvent(XBack.STATE, false, false);
      XBack.element.dispatchEvent(event);
    };

    XBack.listen = function(listener) {
      XBack.element.addEventListener(XBack.STATE, listener, false);
    };

    XBack.init = function() {
      XBack.element = document.createElement("span");
      window.addEventListener("popstate", XBack.onPopState);
      XBack.record(XBack.STATE);
    };
  })(XBack); // 引入这段js文件
  XBack.init();
  XBack.listen(function() {});
}

/**
 * 去掉字符串头尾空格
 * @param str 传入的字符串值
 * @author lqy
 * @since 2015-08-21
 */
export function trim(str) {
  if (str == null || typeof str == "undefined") {
    return "";
  }
  if (typeof str == "number") {
    return str;
  }
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 是否为Null
 * @param object
 * @returns {Boolean}
 */
export function isNull(object) {
  if (object == null || typeof object == "undefined") {
    return true;
  }
  return false;
}

/**
 * 是否为空字符串，有空格不是空字符串
 * @param str
 * @returns {Boolean}
 */
export function isEmpty(str) {
  if (str == null || typeof str == "undefined" || str == "") {
    return true;
  }
  return false;
}

/**
 * 是否为空字符串，全空格也是空字符串
 * @param str
 * @returns {Boolean}
 */
function isBlank(str) {
  if (
    str == null ||
    typeof str == "undefined" ||
    str == "" ||
    trim(str) == ""
  ) {
    return true;
  }
  return false;
}

export function checkMobile(str) {
  //返回值  true  代表格式正确  false代表不正确
  var re = /^1\d{10}$/;
  if (re.test(str)) {
    return true;
  } else {
    return false;
  }
}

export function checkIdCard(value) {
  //返回值  true  代表格式正确  false代表不正确
  var aCity = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  var iSum = 0;
  //身份证位数校验
  if (!/^\d{17}(\d|x)$/i.test(value)) return false;
  value = value.replace(/x$/i, "a");
  //身份证省份校验
  if (aCity[parseInt(value.substr(0, 2))] == null) return true;
  //身份证生日校验
  var sBirthday =
    value.substr(6, 4) +
    "-" +
    Number(value.substr(10, 2)) +
    "-" +
    Number(value.substr(12, 2));
  var d = new Date(sBirthday.replace(/-/g, "/"));
  if (
    sBirthday !=
    d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
  )
    return false;
  //身份证校验码
  for (var i = 17; i >= 0; i--)
    iSum += (Math.pow(2, i) % 11) * parseInt(value.charAt(17 - i), 11);
  if (iSum % 11 != 1) return false;
  return true;
}
//日期格式化
export function dateFormat(date, format = "yyyy-MM-dd HH:mm:ss") {
  if (typeof date != "number" && !(date instanceof Date)) {
    date = date.replace(/-/g, "/");
  }
  let t = new Date(date);
  let tf = function(i) {
    return (i < 10 ? "0" : "") + i;
  };
  return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
    switch (a) {
      case "yyyy":
        return tf(t.getFullYear());
        break;
      case "MM":
        return tf(t.getMonth() + 1);
        break;
      case "mm":
        return tf(t.getMinutes());
        break;
      case "dd":
        return tf(t.getDate());
        break;
      case "HH":
        return tf(t.getHours());
        break;
      case "ss":
        return tf(t.getSeconds());
        break;
    }
  });
}
//时间转化成时间戳格式
export function getTimes(timeVal) {
  let thisTime = timeVal;
  thisTime = thisTime.replace(/-/g, "/");
  let time = new Date(thisTime);
  time = time.getTime();
  return time;
}

//当前num天前日期
export function AgoTimes(time, dayNum) {
  let now = new Date(time.replace(/-/g, "/")).getTime();
  let days = dayNum; //如果是30天前就把7换成30
  let dateDaysAgoTimes = now - 86400 * 1000 * days;
  let date7DaysAgoDate = new Date(dateDaysAgoTimes); //七天前(从1970.1.1开始的毫秒数)
  let date7DaysAgoDateStr = date7DaysAgoDate.getTime(); //七天前日期，格式为：2021/4/9
  return date7DaysAgoDateStr;
}

//当前日期几天后日期
export function afterTime(date, num) {
  let thisDate = date.replace(/-/g, "/");
  let msec = new Date(thisDate).getTime() + 1000 * 60 * 60 * 24 * num;
  return msec;
}

export function getFormData(file) {
  return new Promise(function(resolve, reject) {
    if (file) {
      var reader = new FileReader();
      var image = new Image();
      reader.onload = function(ev) {
        image.src = ev.target.result;
        image.onload = function() {
          var imgWidth = this.width,
            imgHeight = this.height;
          // 控制上传图片的宽高
          if (imgWidth > imgHeight && imgWidth > 750) {
            imgWidth = 750;
            imgHeight = Math.ceil((750 * this.height) / this.width);
          } else if (imgWidth < imgHeight && imgHeight > 1334) {
            imgWidth = Math.ceil((1334 * this.width) / this.height);
            imgHeight = 1334;
          }

          var canvas = document.createElement("canvas"),
            ctx = canvas.getContext("2d");
          canvas.width = imgWidth;
          canvas.height = imgHeight;
          ctx.drawImage(this, 0, 0, imgWidth, imgHeight);
          // 上一步中的函数
          var base64Data = canvas.toDataURL("image/jpeg", 0.3);
          var blob = dataURItoBlob(base64Data);
          // var fd = new FormData(document.forms[0]);
          //
          // fd.append("file",blob,Math.random()+".png");

          resolve(blob);
        };
      };
      reader.readAsDataURL(file);
    }
  });
}

function dataURItoBlob(base64Data) {
  var byteString;
  if (base64Data.split(",")[0].indexOf("base64") >= 0)
    byteString = atob(base64Data.split(",")[1]);
  else byteString = unescape(base64Data.split(",")[1]);
  var mimeString = base64Data
    .split(",")[0]
    .split(":")[1]
    .split(";")[0];
  var ia = new Uint8Array(byteString.length);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ia], { type: mimeString });
}

export function emailValidate(value) {
  return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(
    value
  );
}
export function temporaryRepair() {
  var currentPosition, timer;
  var speed = 1; //页面滚动距离
  timer = setInterval(function() {
    currentPosition =
      document.documentElement.scrollTop || document.body.scrollTop;
    currentPosition -= speed;
    window.scrollTo(0, currentPosition); //页面向上滚动
    currentPosition += speed; //speed变量
    window.scrollTo(0, currentPosition); //页面向下滚动
    clearInterval(timer);
  }, 1);
}
export function isInteger(str) {
  if (!/^\d+$/.test(str)) {
    return false;
  }
  return true;
}
export function fun_date(num, thisDate) {
  //获取指定日期
  var date1 = thisDate;
  //今天时间
  var time1 =
    date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();
  var date2 = new Date(date1);
  date2.setDate(date1.getDate() + num);
  //num是正数表示之后的时间，num负数表示之前的时间，0表示今天
  var time2 =
    date2.getFullYear() + "-" + (date2.getMonth() + 1) + "-" + date2.getDate();
  return time2;
}

export function getRemainderTime(startTime) {
  var s1 = new Date(startTime.replace(/-/g, "/")),
    s2 = new Date(),
    runTime = s1.getTime() - s2.getTime();
  console.log(runTime);
  return runTime;
  // var year = Math.floor(runTime / 86400 / 365);
  // runTime = runTime % (86400 * 365);
  // var month = Math.floor(runTime / 86400 / 30);
  // runTime = runTime % (86400 * 30);
  // var day = Math.floor(runTime / 86400);
  // runTime = runTime % 86400;
  // var hour = Math.floor(runTime / 3600);
  // runTime = runTime % 3600;
  // var minute = Math.floor(runTime / 60);
  // runTime = runTime % 60;
  // var second = runTime;
  // console.log(year,month,day,hour,minute,second);
  //console.log(day, 'day', year, month)
  return (
    month + "月" + day + "天" + hour + "时" + minute + "分" + second + "秒"
  );
}
export function deepClone(obj) {
  let objClone = Array.isArray(obj) ? [] : {};
  if (obj && typeof obj === "object") {
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        //判断ojb子元素是否为对象，如果是，递归复制
        if (obj[key] && typeof obj[key] === "object") {
          objClone[key] = deepClone(obj[key]);
        } else {
          //如果不是，简单复制
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

export function pushHistory() {
  let state = {
    title: '',
    url: ''
  }
  window.history.pushState(state, state.title, state.url)
  console.log(window.history)
}
