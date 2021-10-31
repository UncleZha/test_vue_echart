<template>
  <div>
  </div>
</template>

<script>
import qs from "qs";
export default {
  mounted() {
    //this.$share.sharePage(0);
  },
  data() {
    return {
      photoType: false
    };
  },
  props: {
    ocrStatus: Boolean,
  },
  watch: {
    ocrStatus(newValue, oldValue) {
      if (newValue) {
        this.changeImg()
      }
    }
  },
  methods: {
    changeImg() {
      this.$emit('ocrStatus', false)
      let _this = this;
      wx.chooseImage({
        count: 1, // 最多可以选择的图片张数，默认9
        sizeType: ["compressed"], // original 原图，compressed 压缩图，默认二者都有
        sourceType: ["album", "camera"], // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          let localIds = res.localIds; // 返回选定照片的本地ID列表（手机上操作就是手机端的ID列表，是一个数组），localId可以作为img标签的src属性显示图片
          _this.imgSrc = localIds[0];
          wx.getLocalImgData({
            localId: _this.imgSrc, // 图片的localID
            success: function (res) {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              _this.$emit('ocrBase64', localData)
            }
          });
        },
        fail: function () { },
        complete: function () { }
      });
    }
  }
};
</script>

<style>
.photeContent {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.shadow {
  width: 100%;
  height: 70%;
  background: #000;
  opacity: 0.4;
}
</style>
