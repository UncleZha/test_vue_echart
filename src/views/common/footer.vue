<template>
  <div class="footer">
    <div style="width:3.75rem;height:0.48rem"></div>
    <div class="bottomLine">
      <div class="itemBtnBack" @click.stop="goSign($event)">
        <div class="signBtn">打卡</div>
      </div>
      <div class="halfItem">
        <div
          class="itemBtn"
          style="margin:0 0.44rem 0 0.35rem"
          @click="goPage('/planList')"
        >
          <img
            :src="
              selectStatus == 'plan'
                ? require('../../img/foot/planAction.png')
                : require('../../img/foot/plan.png')
            "
            alt=""
          />
          <div :class="['title', selectStatus == 'plan' ? 'action' : '']">
            待办
          </div>
        </div>
        <div class="itemBtn" @click="goPage('/typecustomerList')">
          <img
            :src="
              selectStatus == 'customer'
                ? require('../../img/foot/customerAction.png')
                : require('../../img/foot/customer.png')
            "
            alt=""
          />
          <div :class="['title', selectStatus == 'customer' ? 'action' : '']">
            顾客
          </div>
        </div>
      </div>
      <div class="halfItem">
        <div
          class="itemBtn"
          style="margin:0 0.43rem 0 0.67rem"
          @click="goPage('/typestoreList')"
        >
          <img
            :src="
              selectStatus == 'store'
                ? require('../../img/foot/storeAction.png')
                : require('../../img/foot/store.png')
            "
            alt=""
          />
          <div :class="['title', selectStatus == 'store' ? 'action' : '']">
            店铺
          </div>
        </div>
        <div class="itemBtn" @click="goPage('/personalCenter')">
          <img
            :src="
              selectStatus == 'my'
                ? require('../../img/foot/myAction.png')
                : require('../../img/foot/my.png')
            "
            alt=""
          />
          <div :class="['title', selectStatus == 'my' ? 'action' : '']">
            我的
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selectStatus: {
      type: String,
      default: "plan"
    }
  },
  methods: {
    goSign(e) {
      e.preventDefault();
      this.$router.push("/clockIn");
    },
    goPage(router) {
      if (this.selectStatus == "plan" && router == "/planList") {
        return;
      }
      if (this.selectStatus == "customer" && router == "/typecustomerList") {
        return;
      }
      if (this.selectStatus == "store" && router == "/typestoreList") {
        return;
      }
      if (this.selectStatus == "my" && router == "/personalCenter") {
        return;
      }
      if (router == "") {
        return;
      }
      this.$router.push(router);
    }
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.bottomLine {
  position: relative;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  width: 3.75rem;
  height: 0.48rem;
  background-color: #ffffff;
}
.itemBtnBack {
  position: absolute;
  left: 50%;
  top: -0.18rem;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0.6rem;
  height: 0.6rem;
  background-color: #e4eeff;
  border-radius: 100%;
}
.signBtn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 0.54rem;
  height: 0.54rem;
  background-color: #438aff;
  border-radius: 100%;
  color: #fff;
  font-size: 0.18rem;
}
.itemBtn img {
  display: block;
  margin: 0.04rem auto 0.01rem;
  width: 0.22rem;
  height: 0.22rem;
}
.title {
  font-size: 0.11rem;
  color: #999999;
}
.halfItem {
  flex: 1;
  display: flex;
}
.action {
  color: #438aff;
}
</style>
