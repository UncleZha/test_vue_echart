/**
 * Created by 82592 on 2018/1/17.
 */
import api from "../axios/api.url";
import axios from "../axios/axios";
import stores from "../store/index";
import { queryURLParameter } from "./common";
const share = {};
//status 0禁止页面有分享功能，1可以分享
//title分享名称
//desc分享描述
//link 分享地址

let app = process.env.VUE_APP_WX_APP_ID;
share.sharePage = function shareIndex(
  status,
  title,
  desc,
  link,
  imgUrl,
  callBack
) {
  // if (process.env.VUE_APP_ENV != "dat") {
  //   title = "测试分享|" + title;
  //   desc = "测试分享|" + desc;
  // }
  console.log(queryURLParameter(link))
  stores.dispatch("httpHideLoad");
  axios({
    method: "GET",
    url: api.shareKey,
    params: {
      shareUrl: link
    }
  })
    .then(res => {
      if (res.code == 0) {
        wx.config({
          debug: false,
          appId: res.data.appId,
          timestamp: res.data.timestamp,
          nonceStr: res.data.nonceStr,
          signature: res.data.signature,
          jsApiList: [
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "showAllNonBaseMenuItem",
            "hideAllNonBaseMenuItem",
            "hideMenuItems",
          ]
        });
        wx.ready(function () {
          stores.commit("setShareLoading", false);
          wx.showAllNonBaseMenuItem();
          if (status == 0) {
            wx.hideAllNonBaseMenuItem();
          } else {
            wx.hideMenuItems({
              menuList: [
                "menuItem:share:qq",
                "menuItem:share:timeline",
                "menuItem:openWithSafari",
                "menuItem:share:weiboApp",
                "menuItem:favorite",
                "menuItem:share:facebook",
                "menuItem:share:QZone"
              ], // 要隐藏的菜单项，只能隐藏“传播类”和“保护类”按钮，所有menu项见附录3
              success: function (res) {
                //alert("隐藏");
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
                //alert("不行");
              }
            });
            //分享到朋友圈
            wx.onMenuShareTimeline({
              title: title, // 分享标题
              link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: imgUrl, // 分享图标
              success: function () {
                let timer = setTimeout(() => {
                  callBack();
                  clearTimeout(timer);
                }, 500);
                // 用户点击了分享后执行的回调函数
              },
              cancel: function (res) {
                alert("分享失败，请重新分享");
              }
            });
            //分享给好友
            wx.onMenuShareAppMessage({
              title: title,
              desc: desc, // 分享描述
              link: JSON.stringify(queryURLParameter(link)) == "{}" || (Object.keys(queryURLParameter(link)).length == 1 && queryURLParameter(link).code != undefined) ? link + '?shareStatus=true' : link + '&shareStatus=true',
              imgUrl: imgUrl, // 分享图标
              type: "",
              dataUrl: "",
              success: function (res) {
                let timer = setTimeout(() => {
                  callBack();
                  clearTimeout(timer);
                }, 500);
              },
              cancel: function (res) {
                alert("分享失败请重新分享");
              }
            });
          }
          // wx.checkJsApi({
          //   jsApiList: [
          //     'chooseImage',
          //     'uploadImage',
          //     'getLocalImgData',
          //     'downloadImage'
          //   ],
          //   success: function (res) {
          //     console.log(JSON.stringify(res));
          //   }
          // });
        });

        wx.error(function (res) {
          stores.commit("setShareLoading", false);
          console.log("err", res);
        });
      }
    })
    .catch(rtn => {
      stores.commit("setShareLoading", false);
      console.log(rtn);
    });
};
export default share;