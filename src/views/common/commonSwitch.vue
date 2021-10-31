<template>
  <div class="switch-warp">
    <input class="mui-switch mui-switch-anim"
           type="checkbox"
           v-model="checkStatus" 
           :disabled="disableStatus"
           />
    <span style="position:absolute;right:0.06rem;"
          v-show="!checkStatus">{{
      disagree
    }}</span>
    <span style="position:absolute;left:0.06rem;color:#fff"
          v-show="checkStatus">{{ agree }}</span>
  </div>
</template>
<script>
export default {
  props: {
    defaultStatus: {
      default: true
    },
    agree: {
      default: ""
    },
    disagree: {
      default: ""
    },
    disable:{
      default:false
    },
    disableStatus:{
      default: false
    }
  },
  components: {},
  created() { },
  mounted() {
    this.checkStatus = this.defaultStatus;
  },
  data() {
    return {
      checkStatus: false,
    };
  },
  watch: {
    defaultStatus() {
      this.checkStatus = this.defaultStatus;
    },
    checkStatus(newVal, oldVal) {
      this.$emit("updateStatus", newVal);
    },
  },
  methods: {}
};
</script>
<style scoped lang="scss" type="text/scss">
input[disabled],input:disabled,input.disabled {
  -webkit-opacity: 1;
  opacity: 1;
}
.switch-warp {
  height: 0.26rem;
  display: flex;
  align-items: center;
  position: relative;
  font-size: 0.12rem;
}
.mui-switch {
  width: 0.52rem;
  height: 0.26rem;
  position: relative;
  border: 0.01rem solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  user-select: none;
  outline: none;
}
.mui-switch:before {
  content: '';
  width: 0.24rem;
  height: 0.24rem;
  position: absolute;
  top: 0px;
  left: 0;
  border-radius: 0.2rem;
  border-top-left-radius: 0.2rem;
  border-top-right-radius: 0.2rem;
  border-bottom-left-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  background-color: #fff;
  box-shadow: 0 0.01rem 0.03rem rgba(0, 0, 0, 0.4);
}
.mui-switch:checked {
  border-color: #438aff;
  box-shadow: #64bd63 0 0 0 0.16rem inset;
  background-color: #438aff;
  box-shadow: 1px 0px 4px 0px rgba(38, 96, 193, 0.57);
}
.mui-switch:checked:before {
  left: 0.26rem;
}
.mui-switch.mui-switch-animbg {
  transition: background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-animbg:checked {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #438aff;
  transition: border-color 0.4s, background-color ease 0.4s;
}
.mui-switch.mui-switch-animbg:checked:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim {
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
    background: #eee;
}
.mui-switch.mui-switch-anim:before {
  transition: left 0.3s;
}
.mui-switch.mui-switch-anim:checked {
  box-shadow: #438aff 0 0 0 0.16rem inset;
  background-color: #438aff;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
.mui-switch.mui-switch-anim:checked:before {
  transition: left 0.3s;
}
</style>
