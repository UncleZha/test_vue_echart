<template>
  <div>
    <header class="myheader">
      <img v-if="iconHome == 'home'"
           @click="goHomeIndex"
           src="../../img/common/goHome.png"
           class="myheader-goHome" />
      <img v-if="iconHome == 'indexHome'"
           @click="goIndex"
           src="../../img/common/goHome.png"
           class="myheader-goHome" />
      <img v-if="icon == 'back'"
           @click="goLastPage"
           src="../../img/common/back.jpg"
           class="myheader-icon-bg" />
      <span class="myheader-title">{{ headerTitle }}</span>
      <span class="editorText"
            v-if="editor"
            @click="editInfo">编辑</span>
    </header>
    <div class="myheader-bg"></div>
  </div>
</template>
<script>
export default {
  components: {},
  props: {
    headerTitle: {
      //头部标题
      required: true
    },
    targetPath: {
      //目标路径（返回的路径）
      default: -1
    },
    icon: {
      default: "back"
    },
    iconHome: {
      default: ""
    },
    isreplace: {
      default: true
    },
    editor: {
      type: Boolean
    }
  },
  created() { },
  mounted() { },
  data() {
    return {};
  },
  methods: {
    goLastPage() {
      if (this.targetPath == -1) {
        this.$router.go(-1);
        return;
      } else if (this.targetPath == 0) {
        this.$router.push({ name: 'ToAudit' })
      }
      else {
        if (this.isreplace) {
          this.$router.replace(this.targetPath);
        } else {
          this.$router.push(this.targetPath);
        }
      }
    },
    goHomeIndex() {
      this.$router.push({ name: '/personalCenter' })
    },
    goIndex() {
      this.$router.push({ name: '/planList' })
    },
    editInfo() {
      this.$emit('editInfo', true)
    }
  }
};
</script>
<style lang="scss" scoped type="text/scss">
.myheader {
  max-width: 750px;
  font-size: 16px;
  color: #000;
  height: 0.44rem;
  position: fixed;
  width: 100%;
  z-index: 1001;
  display: flex;
  align-items: center;
  background: #7f7fd5; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #91eae4,
    #86a8e7,
    #7f7fd5
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: #fff;
}
.myheader-bg {
  width: 100%;
  height: 0.44rem;
}
.myheader-icon-bg {
  width: 0.1rem;
  height: 0.19rem;
  position: absolute;
  z-index: 1;
  left: 0.12rem;
}
.myheader-title {
  font-size: 0.16rem;
  position: absolute;
  display: block;
  top: 0.12rem;
  text-align: center;
  width: 100%;
}
.editorText {
  position: absolute;
  right: 4%;
  color: #438aff;
  font-size: 0.16rem;
}
.myheader-goHome {
  width: 0.12rem;
  height: 0.12rem;
  margin-left: 0.15rem;
  position: relative;
  z-index: 6;
}
</style>
