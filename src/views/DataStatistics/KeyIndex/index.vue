<!--催收总订单-->
<template>
  <div class="CollectionTotalOrderList" style="background-color: #fff">
    <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('DataStatistics')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('KeyIndex')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div>
      <el-row>
        <el-col :span="12"><div id="overdue" style="width: 100%;height: 40vh;"> </div></el-col>
        <el-col :span="12"><div id="loank" style="width: 100%;height: 40vh;"> </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div id="loanNumber" style="width: 100%;height: 40vh;"> </div></el-col>
        <el-col :span="12"><div id="registerNumber" style="width: 100%;height: 40vh;"> </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div id="newUserLoanNumberRate" style="width: 100%;height: 40vh;"> </div></el-col>
        <el-col :span="12"><div id="collectedRate" style="width: 100%;height: 40vh;"> </div></el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'
export default {
  name: "CollectionTotalOrderList",
  data() {
    return {
       params: {
        current: 1,
        pageSize: 10,
        searchParams: {}
      },
    };
  },
  components: {},
  mounted() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
      this.getList()
  },
  methods: {
    collectedRate(val){
      let _this = this
      let valTime = [],val1=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).collectedRate)
      }
      this.collectedRateLine = echarts.init(document.getElementById('collectedRate'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.CollectionRate')]
        },
        color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.CollectionRate'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.collectedRateLine.setOption(option);
    },
    newUserLoanNumberRate(val){
      let _this = this
      let valTime = [],val1=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).newUserLoanNumberRate)
      }
      this.newUserLoanNumberRateLine = echarts.init(document.getElementById('newUserLoanNumberRate'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.NewUserRate')]
        },
        color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.NewUserRate'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.newUserLoanNumberRateLine.setOption(option);
    },
    registerNumber(val){
      let _this = this
      let valTime = [],val1=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).registerNumber)
      }
      this.registerNumberLine = echarts.init(document.getElementById('registerNumber'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.RegisterUser')]
        },
        color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.RegisterUser'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.registerNumberLine.setOption(option);
    },
    loanNumber(val){
      let _this = this
      let valTime = [],val1=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).loanNumber)
      }
      this.loanNumberLine = echarts.init(document.getElementById('loanNumber'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.LoanUser')]
        },
        color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.LoanUser'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.loanNumberLine.setOption(option);
    },
    loank1(val){
      let _this = this
      let valTime = [],val1=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).disbursalAmount)
      }
      this.loankLine = echarts.init(document.getElementById('loank'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.LoanAmount')]
        },
        color: ['#8AE09F'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.LoanAmount'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.loankLine.setOption(option);
    },
    overdue(val){
      let _this = this
      let valTime = [],val1=[],val2=[];
      for (var i in val){
        valTime.push(val[i].time)
        val1.push((val[i]).firstOverdueRate)
        val2.push((val[i]).overdueRate)
      }
      this.overdueLine = echarts.init(document.getElementById('overdue'));

      // 指定图表的配置项和数据
      var option = {
        tooltip: {              //设置tip提示
          trigger: 'axis'
        },

        legend: {               //设置区分（哪条线属于什么）
          data:[_this.$t('tem.OverdueRateFirst'),_this.$t('tem.OverdueRateFinal')]
        },
        color: ['#8AE09F', '#1890ff'],       //设置区分（每条线是什么颜色，和 legend 一一对应）
        xAxis: {                //设置x轴
          type: 'category',
          boundaryGap: false,     //坐标轴两边不留白
          data: valTime,
          name: '',           //X轴 name
          nameTextStyle: {        //坐标轴名称的文字样式
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 0, 20]
          },
          axisLine: {             //坐标轴轴线相关设置。
            lineStyle: {
              color: '#000',
            }
          }
        },
        yAxis: {
          name: '',
          nameTextStyle: {
            color: '#000',
            fontSize: 16,
            padding: [0, 0, 10, 0]
          },
          axisLine: {
            lineStyle: {
              color: '#000',
            }
          },
          type: 'value'
        },
        series: [
          {
            name: _this.$t('tem.OverdueRateFirst'),
            data:  val1,
            type: 'line',               // 类型为折线图
            lineStyle: {                // 线条样式 => 必须使用normal属性
              normal: {
                color: '#8AE09F',
              }
            },
          },
          {
            name: _this.$t('tem.OverdueRateFinal'),
            data: val2,
            type: 'line',
            lineStyle: {
              normal: {
                color: '#1890ff',
              }
            },
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      this.overdueLine.setOption(option);
    },
    getList() {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/manage/statistic/KPIData.htm",
          data: _this.params
        })
        .then(res => {
          _this.collectedRate(res.content.data.urgeKPI)
          _this.newUserLoanNumberRate(res.content.data.loanKPI)
          _this.registerNumber(res.content.data.userKPI)
          _this.loanNumber(res.content.data.loanKPI)
          _this.loank1(res.content.data.loanKPI)
          _this.overdue(res.content.data.overdueKPI)
        })
        .catch(err => {});
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss">
</style>
