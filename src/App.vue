<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <loading :showLoading="showLoading"></loading>
  </div>
</template>

<script>
import "./styles/style.css";
import loading from "./views/common/loading.vue";
import { mapGetters } from "vuex"; 
import Vconsole from "vconsole";
import {
  dateFormat,
  getSession,
  setSession,
  setLocalStg,
  getLocalStg,
  removeLocalStg
} from "./utils/common";
export default {
  components: {
    loading
  },
  computed: {
    ...mapGetters({
      showLoading: "showLoading"
    })
  },
  mounted: function () {
    let env = process.env.VUE_APP_ENV;
    // const vConsole = new Vconsole()

    if (env != 'prd') {
      const vConsole = new Vconsole()
    }
    let indexLoadingWarp = document.getElementById("indexLoadingWarp");
    let indexLoading = document.getElementById("indexLoading");
    if (indexLoading) {
      indexLoadingWarp.removeChild(indexLoading);
    }
    //Vue.use(vConsole)
    // this.$http({
    //   method: "get",
    //   url: this.$api.personInfo,
    //   data: {

    //   }
    // })
    //   .then(res => {
    //     console.log(res);
    //     if (res.code == 200) {


    //     } else {
    //       this.$toast(res.message);
    //     }
    //   })
    //   .catch(rtn => {

    //   });
  },
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped lang="scss" type="text/scss">
.van-overlay {
  left: 100% !important;
}
.slide-fade {
  position: absolute;
  left: 0;
  right: 0;
}
.slide-fade-enter-active {
  transition: all 1.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.1s cubic-bezier(2, 0.5, 0.8, 1);
}
.slide-fade-enter,
.slide-fade-leave-to {
  right: 0;
  transform: translateX(50px);
  opacity: 0;
}
</style>
