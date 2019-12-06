<template>
    <div>
      <div style="text-align: center;margin: 10px 0">
        <el-date-picker
          size="mini"
          v-model="startEndTime"
          type="datetimerange"
          :start-placeholder="$t('table.startdate')"
          :end-placeholder="$t('table.enddate')"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </div>
        <div id="bar" style='height: 340px; width: 550px; margin: 0 auto;'></div>
    </div>
</template>

<script>
    var echarts = require('echarts');
    require("echarts/theme/macarons.js");
    export default {
        name: "bar1",
        data() {
            return {
                menuData: [],
                assetsData: {},
                investmentData: {},
                loading: false,
                data: [],
                item: [],
                first: true,
                startEndTime: []
            };
        },
        computed:{},
        mounted(){
        },
        created() {
        },
        methods:{
            fetch(data) {
                let _this = this;
                var data1 = [];
                var item1 = [];
                var item2 = []
                for (let item in data.fifteenDaysLoan) {
                    item1.push(item.substring(5));
                    item2.push(item);
                }
                for (var i = 0; i < item1.length - 1; i++) {
                    for (var j = i + 1; j < item1.length; j++) {
                        if (item1[i] > item1[j]) {
                            var z = item1[i];
                            item1[i] = item1[j];
                            item1[j] = z;
                            var q = item2[i];
                            item2[i] = item2[j];
                            item2[j] = q;
                        }
                    }
                }
                for (var i = 0; i < item1.length; i++) {
                    data1.push(data.fifteenDaysLoan[item2[i]]);
                }
                _this.data= data1
                _this.item= item1
                _this.first= false
                _this.drawBar()
            },
            drawBar() {
                var me = this;
                var bar = echarts.init(document.getElementById('bar'),'macarons');
                var option = {
                    title: {
                        text: me.$t('index.Dailypaymentamount'),
                        x: 'center',
                        y: 10,
                        textStyle: {
                            color: '#666',
                            fontWeight: 'normal'
                        }
                    },
                    tooltip: {
                        trigger: 'axis',
                        formatter: '{a} <br/>{b}: {c}'+ ' '+ me.$t('index.unit'),
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    barWidth: '10',
                    legend: {
                        orient: 'horizontal',
                        x: 'right',
                        y: 20,
                        itemGap: 20,
                        data: [me.$t('index.Dailypaymentamount')]
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: me.item
                        }
                    ],
                    yAxis: {
                        type: 'value',
                        splitLine: { show: false },
                    },
                    series: [
                        {
                            name: me.$t('index.Dailypaymentamount'),
                            type: 'bar',
                            data: me.data
                        },
                    ]
                };
                bar.setOption(option);
            },
        }
    }
</script>

<style scoped>

</style>
