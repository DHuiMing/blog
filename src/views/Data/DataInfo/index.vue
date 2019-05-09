<template>
  <div class="index_box">
    <div class="user_data">
      <div class="box_list">
        <div class="list_top">
          <p>昨日 | 新增用户数</p>
          <p style="color: gray">3-13(三)</p>
          <p><span style="font-size: 24px;font-weight: bold">100</span><span style="color: gray"> 人</span></p>
        </div>
        <div class="list_foot">
          <span>周同比 </span><span class="iconfont icon-xia" style="color: green"></span><span>12%</span>
          <span style="display: inline-block;width: 20px"></span>
          <span>日环比 </span><span class="iconfont icon-xia1" style="color: red"></span><span>11%</span>
        </div>
      </div>
      <div class="box_list">
        <div class="list_top">
          <p>UV_全站</p>
          <p style="color: gray">3-13(三)</p>
          <p><span style="font-size: 24px;font-weight: bold">1276</span><span style="color: gray"> 人</span></p>
        </div>
        <div class="list_foot">
          <span>周同比 </span><span class="iconfont icon-xia" style="color: green"></span><span>_</span>
          <span style="display: inline-block;width: 20px"></span>
          <span>日环比 </span><span class="iconfont icon-xia1" style="color: red"></span><span>11%</span>
        </div>
      </div>
      <div class="box_list">
        <div class="list_top">
          <p>PV_全站</p>
          <p style="color: gray">3-13(三)</p>
          <p><span style="font-size: 24px;font-weight: bold">100</span><span style="color: gray"> 人</span></p>
        </div>
        <div class="list_foot">
          <span>周同比 </span><span class="iconfont icon-xia" style="color: green"></span><span>12%</span>
          <span style="display: inline-block;width: 20px"></span>
          <span>日环比 </span><span class="iconfont icon-xia1" style="color: red"></span><span>11%</span>
        </div>
      </div>
      <div class="box_list">
        <div class="list_top" style="border-bottom: none;">
          <p>累计 | 注册量</p>
          <p style="color: gray">2018/1/1-2019/03/13</p>
          <p><span style="font-size: 24px;font-weight: bold">100</span><span style="color: gray"> 人</span></p>
        </div>
      </div>
    </div>
    <div class="pic">
      <div class="pic_l">
        <p style="font-size: 16px;font-weight: bold;color: gray;">每日用户注册趋势</p>
        <p class="graymin" style="margin-top: 6px">2019/02/12 - 2019/03/13</p>
        <p class="graymin" style="padding: 8px 0">3-13(三)</p>
        <p><span style="font-size: 26px">4224</span><span style="color: gray"> 人</span></p>
        <p class="ht"><span>环比 </span><span class="iconfont" :class="a<0?'icon-xia1':'icon-xia'" style="color: red;font-size: 14px;">1.4%</span></p>
        <p class="ht"><span>同比 </span><span class="iconfont icon-xia1" style="color: red;font-size: 14px">2.67%</span></p>

        <p style="border-bottom: 1px solid #ccc;margin: 30px 0;width: 100px;"></p>

        <p class="totle">合计 <span style="font-size: 20px;">52130</span> 人</p>
        <p class="totle">均值 <span style="font-size: 20px;">4201</span> 人</p>
      </div>
      <div class="pic_r">
        <div style="min-height: 400px;background-color: #fff;" ref="myEchart"></div>
      </div>

    </div>

  </div>
</template>

<script>
  // 引入基本模板
  let echarts = require('echarts/lib/echarts')
  // 引入柱状图组件
  require('echarts/lib/chart/line')
  // 引入提示框和title组件
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "test",
    data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        a:1.4
      }
    },
    mounted() {
      this.drawLine();
    },
    methods: {
      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let myChart = echarts.init(this.$refs.myEchart)
        // 绘制图表
        myChart.setOption({
          // title: { text: 'ECharts 入门示例' },
          tooltip: {
            trigger: 'axis'
          },
          legend: {

          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          //工具框，可以选择
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            data: ["2-2", "2-3", "2-4", "2-5", "2-6", "2-7"],
            //坐标轴颜色
            axisLine:{
              lineStyle:{
                // color:'#fff'
              }
            },
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            name: '注册量',
            type: 'line',
            data: [50, 83, 96, 75, 112, 48],
            color:['#40a9ff']
          }]
        });
      }
    },
    beforeDestroy() {
      if (!this.chart) { return }
      this.chart.dispose();
      this.chart = null;
    },

  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .index_box{
    margin:16px;
  }
  .user_data{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    .box_list{
      p{
        margin: 10px 0;
      }
      width: 23%;
      background-color: #fff;
      padding: 10px 14px;
      border-radius: 8px;
      font-size: 14px;
      .list_top{
        border-bottom: 1px solid #ccc;
      }
      .list_foot{
        color: gray;
        padding: 8px 0 0 4px;
      }
    }
  }
  .pic{
    background-color: #fff;
    display: flex;
    justify-content: left;
    margin-top: 20px;
    border-radius: 10px;
    padding: 10px 16px;
    .pic_l{
      padding-right: 50px;
      .ht{
        font-size: 12px;color: gray;padding: 2px 0;
      }
      .totle{
        font-size: 12px;
        color: gray;
      }
    }
    .pic_r{
      width: 80%;
    }
  }
  .graymin{
    font-size: 14px;
    color: gray
  }
</style>
