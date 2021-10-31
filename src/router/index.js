import Vue from "vue";
import Router from "vue-router";
import app from "../App.vue";
import api from "../axios/api.url";
import { getSession, getTrackBackNo, setSession } from "../utils/common";
Vue.use(Router);
let router = new Router({
  routes: [
    {
      path: "/",
      component: app, //顶层路由，对应index.html
      children: [
        //二级路由。对应App.vue
        {
          path: "/",
          redirect: "index"
        },
      ]
    },
    {
      path: "/index",
      name: "/index",
      component: resolve => require(["../views/index.vue"], resolve),
      meta: { keepAlive: false, bodyBg: "#eff5ff", isShare: false }
    }
  ]
});
router.afterEach((to, from) => {
  if (to.query.shareStatus) {
    router.replace("/planList");
  }
  document.documentElement.scrollTop = 0;
  let routerName = to.meta.routerName;
  if (to.meta.bodyBg == undefined) {
    window.document.body.style.backgroundColor = "#fff";
  } else {
    window.document.body.style.backgroundColor = to.meta.bodyBg;
  }

});

export default router;
