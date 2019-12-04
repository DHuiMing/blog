<template>
  <section style="margin-top: 10px;min-width: 1200px; overflow: auto;">
    <div v-if="isShow">
      <div class="box">
        <div class="title">
          <span class="sp"></span>
          <span>{{$t('index.Todaydata')}}</span>
        </div>
        <el-row>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.Numberofregistrationstoday')}}</p>
              <p>{{todayCount.register}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.Numberofloanapplications')}}</p>
              <p>{{todayCount.borrow}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.PassCount')}}</p>
              <p>{{todayCount.borrowPass}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.PassRate')}}</p>
              <p>{{todayCount.passApr}}%</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.LoanAmount')}}</p>
              <p>{{todayCount.borrowLoan}}</p>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <p>{{$t('index.Reimbursementamount')}}</p>
              <p>{{todayCount.borrowRepay}}</p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="box" style="margin-top: 10px">
        <div class="title">
          <span class="sp"></span>
          <span>{{$t('index.Theaccumulateddata')}}</span>
        </div>
        <el-row>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>
                <i class="iconfont icon-lishi" style="color: #1296db"></i>{{$t('index.Historicalloantotal')}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.borrowMainLoanHistory}}</span> {{$t('index.unit')}}
              </p>
              <p>
                <i class="iconfont icon-fangkuan" style="color: #1296db"></i>{{$t("index.Theinstallmentshouldreturntotal")}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.BorrowLoanHistory}}</span> {{$t('index.unit')}}
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>
                <i class="iconfont icon-yinhangqiahuankuan" style="color: #1296db;"></i>{{$t('index.Historicalrepaymenttotal')}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.borrowMainRepayHistory}}</span> {{$t('index.unit')}}
              </p>
              <p>
                <i class="iconfont icon-shuju" style="color: #1296db;"></i>{{$t('index.Amortizationtotal')}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.borrowRepayHistory}}</span> {{$t('index.unit')}}
              </p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <p>
                <i class="iconfont icon-lilvfudongguize" style="color: #1296db;"></i>{{$t('index.Historicalrateofreturn')}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.MainRepaymentRate*100 | toFixed}}</span> %
              </p>
              <p>
                <i class="iconfont icon-shuju1" style="color: #1296db;"></i>{{$t('index.Installmentrate')}}
                <span
                  style="font-size: 26px;color: #666"
                >{{cumulativeCount.RepaymentRate*100 | toFixed }}</span> %
              </p>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="box" style="margin-top: 10px;padding-bottom: 16px">
        <div class="title">
          <span class="sp"></span>
          <span>{{$t('index.Realtimedata')}}</span>
        </div>
        <p>
          <i class="iconfont icon-shuju2" style="color: #1296db;"></i>{{$t('index.Totalamounttoberepaid')}}
          <span style="font-size: 26px;color: #666">{{realTimeCount.needRepay | toFixed}}</span> {{$t('index.yun')}}
        </p>
        <p>
          <i class="iconfont icon-fangkuanguanli" style="color: #1296db;"></i>
          {{$t('index.Totaloverduepayment')}}
          <span
            style="font-size: 26px;color: #666"
          >{{realTimeCount.overdueRepay | toFixed}}</span>
           {{$t('index.yun')}}
          <span style="margin-left: 10px">{{realTimeCount.overdueRepay | toFixed}}</span>
          <span style="color: #f50">({{$t('index.Principalandinterest')}})</span>/
          <span>{{realTimeCount.overdueRepay | toFixed}} {{$t('index.yun')}}</span>
          <span style="color: #f50">({{$t('index.penalty')}})</span>
        </p>
      </div>
      <div
        style="background-color: #fff;margin-top: 10px;padding-bottom: 50px;min-width: 1200px; overflow: auto;"
      >
        <div
          style="display: flex;justify-content:space-around;border-bottom: 1px solid #f5f5f5;padding: 20px 0;"
        >
          <bar1 ref="bar1"/>
          <bar2 ref="bar2"/>
        </div>
        <div style="display: flex;justify-content:space-around;padding: 20px 0;">
          <!-- <pie2/>
          <map-box/> -->
        </div>
      </div>
    </div>
    <div
      v-else
      style="text-align: center;font-size: 40px;font-weight: 700;margin-top: 30vh;color: gray;"
    >后台管理系统</div>
  </section>
</template>

<script>
import MapBox from "./MapBox.vue";
import pie2 from "./Pie2.vue";
import bar1 from "./Bar1.vue";
import bar2 from "./Bar2.vue";
export default {
  name: "index",
  data() {
    return {
      isShow: false,
      todayCount: {},
      cumulativeCount: {},
      realTimeCount: {}
    };
  },
  filters: {
    toFixed(type) {
      type ? type : 0;
      type = Number(type);
      let result = type.toFixed(2);
      return result;
    }
  },
  components: {
    MapBox,
    pie2,
    bar1,
    bar2
  },
  computed: {},
  mounted() {
    setTimeout(() => {
      let _this = this;
      if (!_this.$PermList.checkPerm('工作台')) {
        return
      }
      // if (power.children) {
        this.isShow = true;
      //   let code = JSON.parse(power.children[0].code).data;

      //   for (let i in code) {
      //     if (code[i].actionTag == "todayCount") {
            //"首页今日数据统计"
            _this
              .$axios({
                method: "get",
                url: "/manage/aindex/homeInfoTodayCount.htm"
              })
              .then(res => {
                _this.todayCount = res.content;
              })
              .catch(err => {});
          // } else if (code[i].actionTag == "CumulativeCount") {
          //   //"首页累计数据统计"
          //   let _this = this;
            _this
              .$axios({
                method: "get",
                url: "/manage/aindex/homeInfoCumulativeCount.htm"
              })
              .then(res => {
                _this.cumulativeCount = res.content;
              })
              .catch(err => {});
          // } else if (code[i].actionTag == "RealTimeCount") {
          //   //"首页实时数据统计"
          //   let _this = this;
            _this
              .$axios({
                method: "get",
                url: "/manage/aindex/homeInfoRealTimeCount.htm"
              })
              .then(res => {
                _this.realTimeCount = res.content;
              })
              .catch(err => {});
          // } else if (code[i].actionTag == "CountByProvince") {
          //   //"首页地域数据统计"
          // } else if (code[i].actionTag == "CountRepaySource") {
          //   //"首页还款方式统计"
          // } else if (code[i].actionTag == "FifteenDaysCount") {
            //"首页每天放款量，应还款量与实还款量统计"
            // let _this = this;
            _this
              .$axios({
                method: "get",
                url: "/manage/aindex/homeInfoFifteenDaysCount.htm"
              })
              .then(res => {
                _this.$refs.bar1.fetch(res.content);
                _this.$refs.bar2.fetch(res.content);
              })
              .catch(err => {});
          // }
        // }
      // }
    }, 1 * 1000);
  },
  created() {},
  methods: {
    changp() {
      console.log(this.$store.state.app);
    }
  }
};
</script>

<style scoped>
.box {
  background-color: #fff;
}
.box p {
  color: #999;
  text-align: center;
  font-size: 14px;
}
.title {
  padding: 10px 10px 0 10px;
  font-size: 14px;
}
.sp {
  display: inline-block;
  width: 4px;
  height: 12px;
  background-color: #61abd0;
  margin-right: 10px;
  color: #666;
}
</style>
