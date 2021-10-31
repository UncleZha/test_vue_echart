<template>
  <div class="times" v-if="today">
    <div class="row">
      <div class="currenttime">
        {{ selectDay + "农历" + LunarInfo[5] + LunarInfo[6] }}
      </div>
      <div class="todayBtn" @click="backToday()" v-if="selectDay != getDay">
        今
      </div>
    </div>
    <div class="time-bottom">
      <p class="week">
        <span v-for="(item, index) of weeks" :key="index">{{ item }}</span>
      </p>
      <div
        class="dayList"
        ref="dayList"
        @touchstart="scrollStart($event)"
        @touchend="scrollEvent($event)"
      >
        <van-swipe
          class="my-swipe"
          indicator-color="white"
          :show-indicators="false"
          initial-swipe="1"
          @change="lastInfo"
          ref="swipe"
        >
          <van-swipe-item>
            <div class="beforeday" ref="beforeday">
              <span
                v-for="(item, index) of beforemonths"
                :key="index"
                @click="getIndex(index, item.date)"
                ><span
                  class="dayitem"
                  :class="{
                    fontcolor: item.state,
                    finish: item.date == flag,
                    test: !item.state
                  }"
                  tapmode=""
                  >{{ item | today }}</span
                >
                <span class="rest" v-if="item.leaveStatus">{{
                  item.leaveStatus && item.type | statusName
                }}</span>
                <span class="rest" v-if="item.unfinishedStatus">{{
                  item.unfinishedStatus ? "x" : ""
                }}</span>
                <span
                  class="rest"
                  v-if="!item.unfinishedStatus && !item.leaveStatus"
                ></span
              ></span>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="day" ref="day">
              <span
                v-for="(item, index) of months"
                :key="index"
                @click="getIndex(index, item.date)"
                ><span
                  class="dayitem"
                  :class="{
                    fontcolor: item.state,
                    finish: item.date == flag,
                    test: !item.state
                  }"
                  tapmode=""
                  >{{ item | today }}</span
                >
                <!-- <span class="rest"
                      v-if="item.leaveStatus">{{
                  item.leaveStatus && item.type == 0 ? "休息" : "会议"
                }}</span> -->
                <span class="rest" v-if="item.leaveStatus">
                  {{ item.leaveStatus && item.type | statusName }}</span
                >

                <span class="rest" v-if="item.unfinishedStatus">{{
                  item.unfinishedStatus ? "x" : ""
                }}</span>
                <span
                  class="rest"
                  v-if="!item.unfinishedStatus && !item.leaveStatus"
                ></span>
              </span>
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="afterday" ref="afterday">
              <span
                v-for="(item, index) of aftermonths"
                :key="index"
                @click="getIndex(index, item.date)"
                ><span
                  class="dayitem"
                  :class="{
                    fontcolor: item.state,
                    finish: item.date == flag,
                    test: !item.state
                  }"
                  tapmode=""
                  >{{ item | today }}</span
                >
                <!-- <span class="rest"
                      v-if="item.leaveStatus">{{
                  item.leaveStatus && item.type == 0 ? "休息" : "会议"
                }}</span> -->
                <span class="rest" v-if="item.leaveStatus">{{
                  item.leaveStatus && item.type | statusName
                }}</span>
                <span class="rest" v-if="item.unfinishedStatus">{{
                  item.unfinishedStatus ? "x" : ""
                }}</span>
                <span
                  class="rest"
                  v-if="!item.unfinishedStatus && !item.leaveStatus"
                ></span
              ></span>
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
    </div>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from "vant";
import { Lunar } from "../../utils/chooseDate";
import { dateFormat, getSession } from "../../utils/common";
var that = this;
export default {
  components: {
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem
  },
  data() {
    return {
      weeks: ["一", "二", "三", "四", "五", "六", "日"],
      beforemonths: [],
      months: [],
      aftermonths: [],
      day: 0,
      date: 0,
      month: 0,
      year: 0,
      d: 0,
      today: "",
      flag: 0,
      temp: new Date(),
      scrollStatus: true,
      targetTouches: 0,
      changeDate: "",
      changeIndex: -1,
      lastIndex: -1,
      LunarInfo: [],
      preMonthDayStart: "",
      preMonthDayEnd: "",
      nextMonthDayStart: "",
      nextMonthDayEnd: "",
      getDay:''
    };
  },
  props: {
    leaves: {
      type: Object
    },
    unfinished: {
      type: Array
    },
    selectDay: {
      type: String
    },
    retoday: {
      type: String
    }
  },
  watch: {
    leaves: {
      handler: function(val, oldval) {
        //console.log(val, "val111");
        this.beforemonths.forEach(item => {
          item.leaveStatus = false;
          item.type = -1;
        });
        this.aftermonths.forEach(item => {
          item.leaveStatus = false;
          item.type = -1;
        });
        this.months.forEach(item => {
          item.leaveStatus = false;
          item.type = -1;
        });
        if (val) {
          for (var i in val) {
            this.beforemonths.forEach(item => {
              // if (item.date == val[i]) {
              //   item.leaveStatus = true
              // }
              if (item.date == i && val[i] != null) {
                item.leaveStatus = true;
                item.type = val[i].type;
              }
            });
            this.aftermonths.forEach(item => {
              if (item.date == i && val[i] != null) {
                item.leaveStatus = true;
                item.type = val[i].type;
              }
            });
            this.months.forEach(item => {
              if (item.date == i && val[i] != null) {
                item.leaveStatus = true;
                item.type = val[i].type;
              }
            });
          }
        }
      },
      deep: true
    },
    unfinished: {
      handler: function(val, oldval) {
        this.beforemonths.forEach(item => {
          item.unfinishedStatus = false;
        });
        this.aftermonths.forEach(item => {
          item.unfinishedStatus = false;
        });
        this.months.forEach(item => {
          item.unfinishedStatus = false;
        });
        if (val) {
          for (var i in val) {
            this.beforemonths.forEach(item => {
              if (item.date == val[i]) {
                item.unfinishedStatus = true;
              }
            });
            this.aftermonths.forEach(item => {
              if (item.date == val[i]) {
                item.unfinishedStatus = true;
              }
            });
            this.months.forEach(item => {
              if (item.date == val[i]) {
                item.unfinishedStatus = true;
              }
            });
          }
        }
      },
      deep: true
    },
    retoday(val) {
      this.getDay = val
      this.commonMethods(val);
    },
    selectDay(val) {
      this.flag = val;
      let date = new Date(val);
      this.LunarInfo = Lunar.prototype.toLunar(
        date.getFullYear(),
        date.getMonth() + 1,
        date.getDate()
      );
      //this.commonMethods(val)
    }
  },
  filters: {
    today(val) {
      if (val.todayStatus) {
        return "今";
      } else {
        return val.showDate;
      }
    },
    statusName(val) {
      switch (true) {
        case val == 0:
          return "休息";
          break;
        case val < 100:
          return "会议";
          break;
        default:
          return "";
      }
    }
  },
  mounted: function() {},
  methods: {
    backToday() {
      let val = getSession("today");
      if (val == this.selectDay) {
        return;
      }
      this.commonMethods(val);
      this.$refs.swipe.swipeTo(1);
      this.$emit("chooseDate", val);
    },
    commonMethods(val) {
      this.flag = val;
      this.changeDate = new Date(val);
      this.d = new Date(val);
      this.day = this.d.getDay(); //周几
      this.date = this.d.getDate(); //几号
      this.month = this.d.getMonth() + 1; //月
      this.year = this.d.getFullYear();
      this.LunarInfo = Lunar.prototype.toLunar(
        this.d.getFullYear(),
        this.month,
        this.date
      );
      var timestr = this.month + "月" + this.date + "日";
      this.today = timestr;
      this.getResult(this.d);
      this.getResult(new Date(this.fun_date(-7)), "before");
      this.getResult(new Date(this.fun_date(+7)), "after");
      this.preMonthDayStart = new Date(
        this.changeDate.getFullYear(),
        this.changeDate.getMonth() - 2,
        1
      );
      this.preMonthDayEnd = new Date(
        this.changeDate.getFullYear(),
        this.changeDate.getMonth() - 1,
        0
      );
      this.nextMonthDayStart = new Date(
        this.changeDate.getFullYear(),
        this.changeDate.getMonth() + 2,
        1
      );
      this.nextMonthDayEnd = new Date(
        this.changeDate.getFullYear(),
        this.changeDate.getMonth() + 3,
        0
      );
      this.$nextTick(() => {
        this.scroller();
      });
    },
    scroller(e) {
      let width = this.$refs.beforeday.clientWidth;
      this.$refs.dayList.scrollTo(width, 0);
    },
    scrollStart(e) {
      this.targetTouches = e.targetTouches[0].pageX;
    },
    scrollEvent(e) {
      //监听滚动后需要修改数据的数组
      let ref = e.target.scrollLeft;
      this.changedTouches = e.changedTouches[0].pageX;
      if (this.changeIndex == this.lastIndex) {
        return;
      }
      if (this.targetTouches < this.changedTouches) {
        //往左划
        if (this.aftermonths[0].date == "2021-01-25") {
          //最小日期展示在2021年2月1日
          this.$refs.swipe.next();
          return;
        }
        this.changeDate = new Date(
          new Date(this.changeDate).setDate(this.changeDate.getDate() - 7)
        );
        if (this.changeIndex == 0) {
          this.getResult(new Date(this.fun_date(-7)), "after");
        } else if (this.changeIndex == 2) {
          this.getResult(new Date(this.fun_date(-7)));
        } else if (this.changeIndex == 1) {
          this.getResult(new Date(this.fun_date(-7)), "before");
        }
        //
      } else if (this.targetTouches > this.changedTouches) {
        //往右划
        this.changeDate = new Date(
          new Date(this.changeDate).setDate(this.changeDate.getDate() + 7)
        );
        if (this.changeIndex == 0) {
          this.getResult(new Date(this.fun_date(+7)));
        } else if (this.changeIndex == 2) {
          this.getResult(new Date(this.fun_date(+7)), "before");
        } else if (this.changeIndex == 1) {
          this.getResult(new Date(this.fun_date(+7)), "after");
        }
      }
      this.lastIndex = this.changeIndex;
    },
    lastInfo(index) {
      if (index == this.changeIndex) {
        this.changeIndex = -1;
        return;
      }
      this.changeIndex = index;
    },
    getMonDate: function(test) {
      if (test.getDay() == 1) return test;
      if (test.getDay() == 0) test.setDate(test.getDate() - 6);
      else test.setDate(test.getDate() - test.getDay() + 1);
      return test;
    },
    getResult: function(time, state, a) {
      //获取日期数组渲染
      var timeobj = this.getMonDate(time); // timeobj是当前星期一的日期对象
      var temTime = new Date(timeobj.getTime()); //当前当前星期一对象转换成时间戳
      var arr = [];
      //var week = [];
      var dayss = new Date();
      for (var i = 0; i < 7; i++) {
        var time1 = new Date(temTime.getTime());
        var time2 = dayss.getTime();
        var result = time1 <= time2;
        var ymd = dateFormat(temTime, "yyyy-MM-dd");
        // arr.push({'dayss':temTime.getDate(),'daystate':false}); //一周几号
        let leaveStatus = false;
        let type = "";
        for (let key in this.leaves) {
          if (ymd == key) {
            leaveStatus = true;
            type = this.leaves[key].type;
          }
        }
        // this.leaves.forEach(item => {
        //   if (ymd == item) {
        //     leaveStatus = true
        //   }
        // })
        let unfinishedStatus = false;
        this.unfinished.forEach(item => {
          if (ymd == item) {
            unfinishedStatus = true;
          }
        });
        // console.log('ymd',ymd)
        // console.log('preMonthDayEnd',dateFormat(this.preMonthDayEnd, 'yyyy-MM-dd'))
        if (ymd == dateFormat(this.preMonthDayEnd, "yyyy-MM-dd")) {
          this.getMoreleaves("preMonthDay");
        } else if (ymd == dateFormat(this.nextMonthDayStart, "yyyy-MM-dd")) {
          this.getMoreleaves("nextMonthDay");
        }
        arr.push({
          date: ymd,
          state: result,
          showDate: temTime.getDate(),
          todayStatus:
            getSession("today") == dateFormat(temTime, "yyyy-MM-dd")
              ? true
              : false,
          leaveStatus: leaveStatus,
          type: type,
          unfinishedStatus: unfinishedStatus
        });
        temTime.setDate(temTime.getDate() + 1);
      }
      if (state == "before") {
        this.beforemonths = arr;
      } else if (state == "after") {
        this.aftermonths = arr;
      } else {
        this.months = arr;
      }
    },
    getMoreleaves(dateStatus) {
      // console.log(dateStatus)
      let data = {};
      if (dateStatus == "preMonthDay") {
        data.start_at = dateFormat(this.preMonthDayStart, "yyyy-MM-dd");
        data.end_at = dateFormat(this.preMonthDayEnd, "yyyy-MM-dd");
      } else {
        data.start_at = dateFormat(this.nextMonthDayStart, "yyyy-MM-dd");
        data.end_at = dateFormat(this.nextMonthDayEnd, "yyyy-MM-dd");
      }
      // console.log(data)
      this.$http({
        method: "GET",
        url: this.$api.leaves,
        params: data
      })
        .then(res => {
          if (res.code == 0) {
            this.leaves.push(...res.data);
            // THIS.leaves=res.data
            if (dateStatus == "preMonthDay") {
              this.preMonthDayStart = new Date(
                this.preMonthDayStart.getFullYear(),
                this.preMonthDayStart.getMonth() - 1,
                1
              );
              this.preMonthDayEnd = new Date(
                this.preMonthDayStart.getFullYear(),
                this.preMonthDayStart.getMonth() - 1,
                0
              );
            } else {
              this.nextMonthDayStart = new Date(
                this.nextMonthDayStart.getFullYear(),
                this.nextMonthDayStart.getMonth() + 1,
                1
              );
              this.nextMonthDayEnd = new Date(
                this.nextMonthDayStart.getFullYear(),
                this.nextMonthDayStart.getMonth() + 1,
                0
              );
            }
          } else {
            this.$toast(res.message);
          }
        })
        .catch(rtn => {
          this.$toast(rtn.message);
        });

      // this.$http({
      //   method: "GET",
      //   url: this.$api.unfinishedDay,
      //   params: data
      // })
      //   .then(res => {
      //     if (res.code == 0) {
      //       this.unfinished.push(...res.data)
      //     } else {
      //       this.$toast(res.message);
      //     }
      //   })
      //   .catch(rtn => {
      //     this.$toast(rtn.message)
      //   });
    },
    getTimes: function(temp2) {
      var m = temp2.getMonth() + 1;
      var d = temp2.getDate();
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      this.today = m + "月" + d + "日";
    },
    formatDate: function(date) {
      var year = date.getFullYear();
      var months = date.getMonth() + 1;
      var month = (months < 10 ? "0" + months : months).toString();
      var day = (date.getDate() < 10
        ? "0" + date.getDate()
        : date.getDate()
      ).toString();
      return year + month + day;
    },
    getIndex: function(idx, item) {
      this.flag = item;
      this.$emit("chooseDate", item);
    },
    fun_date(aa) {
      var date1 = this.changeDate;
      //time1 = date1.getFullYear() + "-" + (date1.getMonth() + 1) + "-" + date1.getDate();//time1表示当前时间
      var date2 = new Date(date1);

      date2.setDate(date1.getDate() + aa);
      var time2 =
        date2.getFullYear() +
        "/" +
        (date2.getMonth() + 1) +
        "/" +
        date2.getDate();
      return time2;
    }
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.times /deep/ .van-swipe__track {
  display: flex;
}
.row {
  display: flex;
}
.todayBtn {
  width: 0.2rem;
  height: 0.2rem;
  line-height: 0.2rem;
  background: #eff5ff;
  border: 1px solid #438aff;
  text-align: center;
  border-radius: 50%;
  font-size: 0.14rem;
  color: #438aff;
  margin-top: 0.21rem;
  margin-left: 0.08rem;
  font-weight: bold;
}
.times {
  overflow: hidden;
  background: #fff;
  box-shadow: 0px 0.04rem 0.05rem 0px rgba(194, 217, 255, 0.43);
  border-radius: 0.15rem;
}
.time-top {
  width: 100%;
}
.aui-icon-left,
.aui-icon-right {
  width: 0.35rem;
  height: 0.7rem;
  color: #999999;
}
.currenttime {
  color: #191919;
  font-size: 0.17rem;
  text-align: left;
  padding: 0.18rem 0 0.15rem 0.15rem;
}
.week,
.day {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
}
.day {
  height: 0.35rem;
}
.dayList::-webkit-scrollbar {
  display: none;
}
.dayList {
  display: flex;
  width: 100%;
  -overflow-x: scroll;
  overflow: hidden;
}
.dayList div {
  min-width: 3.75rem;
}
.beforeday {
  top: 0;
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
  clear: both;
}
.afterday {
  width: 100%;
  text-align: left;
  display: flex;
  justify-content: center;
  align-items: center;
}
.week span {
  flex: 1;
  font-size: 0.11rem;
  color: #999999;
}

.beforeday span {
  flex: 1;
}
.day span {
  flex: 1;
}
.afterday span {
  flex: 1;
}
.dayitem {
  border-radius: 50%;
  font-size: 0.14rem;
  color: #333333;
  display: inline-block;
  line-height: 0.22rem;
  text-align: center;
  width: 0.22rem;
  font-weight: bold;
  margin-top: 0.05rem;
  padding-top:0.005rem;
}
.time-bottom span {
  text-align: center;
}
.time-bottom {
  margin-bottom: 0.1rem;
}
.walk {
  width: 100%;
  height: 11rem;
  margin-bottom: 10px;

  background-size: 100% 100%;
  border-radius: 0.25rem;
  position: relative;
}
.walk-top {
  padding-top: 0.5rem;
  padding-left: 0.4rem;
  padding-right: 0.5rem;
}
.walk-top span:nth-of-type(2) {
  margin-right: 0.15rem;
  color: #999;
  font-size: 0.6rem;
}
.walk-top img {
  display: inline-block;
}
.walk-top img:nth-of-type(1) {
  width: 0.75rem;
  height: 0.75rem;
  vertical-align: middle;
}
.walk-top .self {
  display: inline-block;
  width: 2.25rem;
  text-align: center;
  border-radius: 0.25rem;
  line-height: 0.75rem;
  height: 0.75rem;

  background-size: 100% 100%;
  font-size: 0.4rem;
  color: #fff;
}
.walk-top span:nth-of-type(4) {
  float: right;
  color: #23acf8;
  font-size: 0.16rem;
}
.bodystate {
  position: absolute;
  bottom: 0.5rem;
  width: 100%;
  padding-left: 0.75rem;
  color: #959595;
  font-size: 0.16rem;
}
.btcl {
  width: 100%;
  height: 6rem;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
}
.bodystate img {
  width: 0.6rem;
  height: 0.6rem;
  margin-right: 0.25rem;
  display: inline-block;
}
.btcl p {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 2.5rem;
  background: #55cb93;
  box-shadow: 0.05rem 0.05rem 0.75rem 0.1rem #9af7cb;
  color: #ffffff;
  line-height: 3.5rem;
  text-align: center;
  font-size: 0.16rem;
}
.finish {
  background-color: #438aff;
  box-shadow: 0px 0px 0.05rem 0.01rem #438aff;
  color: #fff !important;
}
.fontcolor {
  color: #191919;
}
.test {
  pointer-events: none;
}
.warp {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.rest {
  height: 0.14rem;
  line-height: 0.14rem;
  font-size: 0.1rem;
  color: #feb44c;
  display: block;
  // margin-top: -0.02rem;
}
</style>
