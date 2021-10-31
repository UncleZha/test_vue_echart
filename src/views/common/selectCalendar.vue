<template>
  <div class="selectCalendar">
    <div class="commonheader">
      <img src="../../img/common/back.jpg"
           alt=""
           @click="closePage">
      <div style="text-align:center;width:100%">日期选择</div>
    </div>
    <div style="width:100%;height:0.44rem"></div>
    <div class="headerLine">
      <div :class="['itemType',type=='single'?'select':'']"
           @click="changeType('single')">单日</div>
      <div :class="['itemType',type=='multiple'?'select':'']"
           @click="changeType('multiple')">多日</div>
      <div :class="['itemType',type=='range'?'select':'']"
           @click="changeType('range')">起止</div>
    </div>
    <div>
      <van-calendar :type=type
                    :poppable="false"
                    :show-title="false"
                    :show-subtitle="false"
                    :max-date="endDate"
                    :show-confirm="false"
                    @select="selectDate"
                    @unselect="unselectDate"></van-calendar>
    </div>
    <div class="finishBtn"
         @click="submit()">完成</div>
  </div>
</template>

<script>
import CommonHead from "./CommonHead";
import { Calendar } from "vant";
import {
  dateFormat, getSession, setSession,
} from "../../utils/common";
export default {
  components: {
    CommonHead,
    [Calendar.name]: Calendar,
  },
  data() {
    return {
      endDate: new Date('2022-01-01'),
      type: 'single',
      singleData: '',
      multipleData: [],
      rangeData: [],
    }
  },
  methods: {
    selectDate(val) {
      if (this.type == 'single') {
        this.singleData = val
      } else if (this.type == 'multiple') {
        this.multipleData = val
      } else if (this.type == 'range') {
        this.rangeData = val
      }
    },
    unselectDate(val) {
      this.multipleData.filter((item, index) => {
        if (dateFormat(item, 'yyyy-MM-dd') == dateFormat(val, 'yyyy-MM-dd')) {
          this.multipleData.splice(index, 1)
        }
      })
    },
    changeType(type) {
      this.type = type
    },
    closePage() {
      this.$emit('backCalendarpage', false)
    },
    submit() {

      let date = ''
      let dateArr = []
      if (this.type == 'single') {
        if (this.singleData == '') {
          date = getSession('today')
        } else {
          date = dateFormat(this.singleData, 'yyyy-MM-dd')
        }
        setSession('calendarType', this.type)
        this.$emit('chooseCalendar', date)

      } else if (this.type == 'multiple') {

        if (this.multipleData.length == 0) {
          dateArr.push(getSession('today'))
        } else {
          this.multipleData.filter(item => {
            dateArr.push(dateFormat(item, 'yyyy-MM-dd'))
          })
        }
        setSession('calendarType', this.type)
        this.$emit('chooseCalendar', dateArr)

      } else if (this.type == 'range') {
        if (this.rangeData.length == 0) {
          dateArr.push(getSession('today'))
          let day = new Date(getSession('today'))
          day.setTime(day.getTime() + 24 * 60 * 60 * 1000);
          dateArr.push(dateFormat(new Date(day), 'yyyy-MM-dd'))
        } else {
          if (this.rangeData[1] == null) {
            this.$$toast('请选择结束日期')
            return
          } else {
            this.rangeData.filter(item => {
              dateArr.push(dateFormat(item, 'yyyy-MM-dd'))
            })
          }
        }
        setSession('calendarType', this.type)
        this.$emit('chooseCalendar', dateArr)

      }


    }
  }
}
</script>

<style lang="scss" scoped type="text/scss">
.selectCalendar /deep/ .van-calendar__body {
  height: 3rem;
  overflow-y: scroll;
  flex: auto;
}
.selectCalendar /deep/ .van-calendar__weekday {
  font-size: 0.11rem;
  color: #999999;
}
.selectCalendar /deep/ .van-calendar__month-title {
  display: none;
}

.selectCalendar /deep/ .van-calendar__selected-day {
  background-color: #438aff;
}
.headerLine {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 0.44rem;
  border-bottom: 0.01rem solid #f5f5f5;
}
.selectCalendar /deep/ .van-calendar__day--multiple-selected {
  background-color: #438aff;
}
.selectCalendar /deep/ .van-calendar__day--start {
  background-color: #438aff;
}
.selectCalendar /deep/ .van-calendar__day--end {
  background-color: #438aff;
}
.selectCalendar /deep/ .van-calendar__day--multiple-middle {
  background-color: #438aff;
}
.selectCalendar /deep/ .van-calendar__selected-day {
  height: 0.64rem;
}
.selectCalendar /deep/ .van-calendar__day--middle::after {
  background-color: #438aff;
  opacity: 0.1;
}
.itemType {
  font-size: 0.15rem;
  color: #666666;
  line-height: 0.42rem;
}
.select {
  color: #438aff;
  border-bottom: 0.02rem solid #438aff;
}
.finishBtn {
  width: 3.45rem;
  line-height: 0.44rem;
  background-color: #438aff;
  border-radius: 0.22rem;
  text-align: center;
  color: #fff;
  font-size: 0.18rem;
  position: fixed;
  bottom: 0.44rem;
  left: 0.15rem;
}
.commonheader {
  font-size: 0.16rem;
  color: #000;
  height: 0.44rem;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  background: #fff;
  text-align: center;
}
.commonheader img {
  width: 0.1rem;
  height: 0.19rem;
  position: absolute;
  z-index: 1;
  left: 0.12rem;
}
</style>