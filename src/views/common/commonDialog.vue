<template>
  <div class="commonDialog">
    <van-popup v-model="showPop"
               class="popup"
               :close-on-click-overlay=false>
      <img :src=imgIcon
           alt=""
           class="success">
      <div class="status">{{statusInfo}}</div>
      <div class="hint"
           v-if="hintStatus">{{hintInfo}}</div>
      <div class="btnLine"
           v-if="btnLineStatus">
        <div class="checkDetail"
             @click="goPage('checkDetail')">{{leftName}}</div>
        <div class="addWait"
             @click="goPage('addWait')">{{rightName}}</div>
      </div>
      <div class="backPage"
           v-if="backPageStatus"
           @click="goPage('backPage')">返回首页</div>
    </van-popup>
  </div>
</template>

<script>
import { Popup } from 'vant';
export default {
  components: {
    [Popup.name]: Popup,
  },
  props: {
    imgIcon: {
      type: String,
      default: require('../../img/success.png')
    },
    statusInfo: {
      type: String,
      default: '提交成功'
    },
    hintInfo: {
      type: String,
      default: '审核结果的提醒将在【我的】页面中呦~'
    },
    hintStatus: {
      type: Boolean,
      default: true
    },
    btnLineStatus: {
      type: Boolean,
      default: true
    },
    leftName: {
      type: String,
      default: '查看详情'
    },
    rightName: {
      type: String,
      default: '新增待办'
    },
    backPageStatus: {
      type: Boolean,
      default: true
    },
    showPop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
    }
  },
  methods: {
    goPage(page) {
      this.$emit('goPage', page)
    }
  }
}
</script>

<style scoped lang="scss" type="text/scss">
.popup {
  width: 2.89rem;
  border-radius: 0.15rem;
}
.success {
  display: block;
  margin: 0.33rem auto 0;
  width: 0.55rem;
  height: 0.55rem;
}
.status {
  margin: 0.1rem 0 0 0;
  font-size: 0.18rem;
  color: #333333;
  text-align: center;
}
.hint {
  font-size: 0.14rem;
  color: #999999;
  text-align: center;
}
.btnLine {
  margin-top: 0.24rem;
  display: flex;
  border-top: solid 0.01rem #eeeeee;
}
.btnLine div {
  flex: 1;
  color: #438aff;
  line-height: 0.45rem;
  text-align: center;
}
.checkDetail {
  border-right: 0.01rem solid #eee;
}
.backPage {
  text-align: center;
  line-height: 0.44rem;
  background-color: #438aff;
  color: #fff;
}
</style>