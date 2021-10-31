<template>
  <div class="checkImg"
       ref=checkImg>
    <van-popup v-model="showStatus">
      <van-swipe class="my-swipe"
                 indicator-color="white"
                 :show-indicators="false"
                 :initial-swipe=chooseIndex
                 ref="swipe">
        <van-swipe-item v-for="(item,index) in imgList"
                        :key="index"
                        class="itemSwipe">
          <img :src="item"
               alt="">
        </van-swipe-item>
      </van-swipe>
    </van-popup>
  </div>
</template>

<script>
import { Swipe, SwipeItem, Popup } from 'vant';
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Popup.name]: Popup,
  },
  props: {
    imgList: {
      type: Array
    },
    chooseIndex: {
      type: Number
    },
    checkStatus: {
      type: Boolean,
      default: 'false'
    }
  },
  data() {
    return {
      showStatus: false
    }
  },
  mounted() {},
  watch: {
    checkStatus(newValue) {
      if (newValue) {
        this.showStatus = this.checkStatus
        this.$refs.checkImg.style.top = (document.documentElement.scrollTop / 100) + 'rem'
      }
    },
    showStatus(newval) {
      if (!newval) {
        this.$emit('getcheckStatus', newval)
      }
    }
  },
}
</script>

<style lang="scss" scoped type="text/scss">
.checkImg /deep/ .van-popup {
  background: none;
}
.checkImg /deep/ .van-swipe-item {
  width: 3.75rem;
}
.checkImg {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 100;
}

img {
  width: 3.2rem;
  height: 4rem;
  display: block;
  margin: 0 auto 0;
}
</style>