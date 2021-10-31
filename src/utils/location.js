import api from "../axios/api.url";
import axios from "../axios/axios";
import getLog from "../utils/Log.js";

location.getLocation = function shareIndex(
  isOpenMap = false,
  isGetCity = false
) {
  return new Promise(function(resolve, reject) {
    axios({
      method: "GET",
      url: api.shareKey,
      params: {
        shareUrl: window.location.href.split("#")[0]
      }
    })
      .then(res => {
        if (res.code == 0) {
          getLog("微信分享参数成功", res);
          wx.config({
            debug: false,
            appId: res.data.appId,
            timestamp: res.data.timestamp,
            nonceStr: res.data.nonceStr,
            signature: res.data.signature,

            jsApiList: ["getLocation", "openLocation"]
          });
          wx.ready(function() {
            wx.getLocation({
              type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
              success: function(res) {
                getLog("获取经纬度赋值", res);
                var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
                var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
                let cityInfo = {};
                if (isOpenMap) {
                  wx.openLocation({
                    longitude: longitude, // 经度，浮点数，范围为180 ~ -180。
                    latitude: latitude, // 纬度，浮点数，范围为90 ~ -90
                    name: "测试", // 位置名
                    address: "123", // 地址详情说明
                    scale: 1, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: "" // 在查看位置界面底部显示的超链接,可点击跳转
                  });
                }
                if (isGetCity) {
                }
                cityInfo.latitude = latitude;
                cityInfo.longitude = longitude;
                resolve(cityInfo);
              },
              fail(rtn) {
                getLog("fail拒绝授权", rtn);
                console.log("我走进来了", "fail");
                reject("用户拒绝授权");
              },
              cancel() {
                getLog("cancel拒绝授权");
                console.log("我走进来了", "cancel");
                reject("用户拒绝授权");
              },
              error() {
                getLog("error拒绝授权");
                console.log("我走进来了", "error");
                reject("用户拒绝授权");
              }
            });
          });
        } else {
          getLog("微信分享参数失败", res);
        }
      })
      .catch(rtn => {
        console.log(rtn);
        getLog("reject失败回调", rtn);
      });
  });
};

export default location;
