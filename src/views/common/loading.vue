<template>
  <div>
    <div class="loading"
         v-if="showLoading"
         @click="close"
         @touchmove.prevent>
      <div class="loading-img">
        <img src="../../img/loading/loading.gif">
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loading',
  props: {
    showLoading: {
      default: false
    }
  },
  components: {},
  watch: {
    showLoading(curVal, oldVal) {
    }
  },
  created() {
  },
  mounted() {
  },
  data() {
    return {

    }
  },
  methods: {
    close() {
      this.$emit("closeBox");
    }
  },
}
</script>
<style scoped lang="scss" type="text/scss">
.loading-text {
  color: white;
  font-size: 0.15rem;
}
.loading {
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 9999;
}
.loading-img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  img {
    width: 0.6rem;
    height: 0.6rem;
  }
}
</style>