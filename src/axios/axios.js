import axios from "axios";
import stores from "../store/index.js";
import Vue from "vue";
import router from "../router";
import { Toast } from "vant";
Vue.use(Toast);
import {
  delSession,
  getSession,
  removeLocalStg,
  setSession
} from "../utils/common";
axios.defaults.timeout = 120000;

// 请求发出拦截器
let errorMessage = "";
axios.interceptors.request.use(
  config => {
    if (config.url != "https://shangyounth.oss-cn-beijing.aliyuncs.com/") {
      let env = process.env.VUE_APP_ENV;
      if (localStorage.getItem("access_real_token") && env == "prd") {
        config.headers = {
          Authorization: "Bearer " + localStorage.getItem("access_real_token")
        };
      } else if (localStorage.getItem("access_test_token") && env != "prd") {
        config.headers = {
          Authorization: "Bearer " + localStorage.getItem("access_test_token")
        };
      } else {
      }
    }

    if (stores.getters.httpLoading == true) {
      stores.dispatch("showloader");
    }
    if (stores.getters.httpLoading == false) {
      stores.dispatch("hideloader");
    }
    return config;
  },
  error => {
    Message.error({
      message: "参数错误"
    });
    return Promise.reject(error);
  }
);

//请求响应拦截器

axios.interceptors.response.use(
  res => {
    console.log(res)
    stores.dispatch("hideloader");
    if (stores.getters.httpLoading == false) {
      stores.dispatch("httpShowLoad");
    }
    errorMessage = res.data;
    //console.log(res.status, 'status')
    if (res.status === 200) {
      if (res.data.code == 400 || res.data.code == 411) {
        //  sessionStorage.removeItem("authCode");
      }
      return res.data;
    }
  },
  error => {
    stores.dispatch("hideloader");
    if (stores.getters.httpLoading == false) {
      stores.dispatch("httpShowLoad");
    }
    //这里屏蔽掉promise的错误返回值，否则前端axios不做catch处理时控制台会出错！
    let errorUrl = ["paySubmit"];
    if (errorUrl.some(item => error.config.url.includes(item))) {
      return Promise.reject("OrderDuring");
    }
    console.log("++++", error.response);
    if (error.response.status == 401) {
      if (getSession("lzWxAuthCode")) {
        delSession("lzWxAuthCode");
      }
      setSession("routerPath", router.history.current.fullPath);
      removeLocalStg("access_real_token");
      removeLocalStg("access_test_token");
      delSession("isLogin");
      let url = window.location.href;
      if (url.includes("/?")) {
        window.location.href =
          url.substring(0, url.indexOf("/?") + 1) + "#/login";
      } else {
        router.replace("/login");
      }
    } else if (error.response.status == 400) {
      // this.$toast(error.response.data.message)
      Toast(error.response.data.message);
      // return error.response.data
    }
    return Promise.reject(error);
  }
);

export default axios;
