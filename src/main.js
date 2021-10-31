import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "./axios/axios.js";
import api from "./axios/api.url";
import share from "./utils/share";
import { Toast, Dialog, ImagePreview } from "vant";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(Toast);
Vue.use(ImagePreview)
Vue.use(ViewUI);
Vue.prototype.$http = axios;
Vue.prototype.$api = api;
Vue.prototype.$share = share;
Vue.prototype.$store = store;
Vue.config.productionTip = false;
Vue.prototype.$toast = Toast;
Vue.prototype.$ImagePreview = ImagePreview;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");