<template>
  <div class="body" :style="{height: client_height+'px', width: client_width+'px'}">
    <div class="title">
      展示
    </div>
    <div class="content" :style="{height: client_height+'px', width: client_width+'px'}">
      <div class="child_content">
        <div class="second_level_content">
          <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
        </div>
        <div class="second_level_content"></div>
      </div>
      <div class="child_content"></div>
      <div class="child_content">
        <div class="second_level_content"></div>
        <div class="second_level_content"></div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      client_height: 0,
      client_width: 0,
      second_level_height: 0,
      second_level_width: 0,
      chart_one: undefined,
    }
  },
  methods: {
    getClientHeight() {
      let clientHeight = 0;
      if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      } else {
        clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
      }
      console.log(clientHeight)
      return clientHeight;
    },
    getClientWidth() {
      let clientWidth = 0;
      if (document.body.clientWidth && document.documentElement.clientWidth) {
        clientWidth = (document.body.clientWidth < document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
      } else {
        clientWidth = (document.body.clientWidth > document.documentElement.clientWidth) ? document.body.clientWidth : document.documentElement.clientWidth;
      }
      console.log(clientWidth)
      return clientWidth;
    },
    setBgWH() {
      this.client_height = this.getClientHeight();
      this.client_width = this.getClientWidth();
      this.second_level_height = (this.client_height - 50) * 0.45;
      this.second_level_width = (this.client_width) * 0.32;
    },
    drawLine() {

      // 绘制图表
      this.chart_one.setOption({
        title: {text: '在Vue中使用echarts'},
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      });
    }
  },
  created() {

  },
  mounted() {
    this.setBgWH()
    // 基于准备好的dom，初始化echarts实例
    this.chart_one = this.$echarts.init(document.getElementById('myChart'), null, {
      width: this.second_level_width,
      height: this.second_level_height
    })
    this.drawLine();

    window.onresize = () => {
      this.chart_one.resize();
      return (() => {
        this.setBgWH()
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  width: 100%;
  height: 100%;
}

.title {
  height: 5rem;
  width: 100%;
  border: 1px solid red;
  position: fixed;
  top: 0;
}

.content {
  padding-top: 5rem;
  width: 100%;
  height: 100%;
  border: 1px solid blue;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.child_content {
  width: 32%;
  border: 1px solid green;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}

.second_level_content {
  height: 48%;
  width: 100%;
  border: 1px solid black;
  overflow: hidden;
}

#myChart {
  display: flex;
  align-items: center;
}
</style>