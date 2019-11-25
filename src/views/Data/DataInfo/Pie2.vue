<template>
  <div>
    <div id="pie2" style="height: 280px; width: 500px; margin: 0 auto;"></div>
  </div>
</template>

<script>
var echarts = require("echarts");
require("echarts/theme/macarons.js");
export default {
  name: "pie2",
  data() {
    return {
      menuData: [],
      assetsData: {},
      investmentData: {},
      loading: false,
      item: [],
      value: [],
      first: true
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      let _this = this;
      _this
        .$axios({
          method: "get",
          url: "/manage/aindex/homeInfoCountRepaySource.htm"
        })
        .then(res => {
          let data = res.content;
          _this.value1 = data.repaySource[0]["自动代扣"];
          _this.value2 = data.repaySource[1]["银行卡转账"];
          _this.value3 = data.repaySource[2]["支付宝转账"];
          _this.value4 = data.repaySource[3]["主动回款"];
          _this.first = false;
          _this.drawPie();
        })
        .catch(err => {});
    },
    drawPie() {
      var me = this;
      var pie = echarts.init(document.getElementById("pie2"), "macarons");
      var option = {
        title: {
          text: "回款方式",
          x: 400,
          y: 20,
          textStyle: {
            color: "#666"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}笔 ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: 400,
          top: "30%",
          data: ["自动代扣", "银行卡转账", "支付宝转账", "主动回款"]
        },
        series: [
          {
            name: "回款方式",
            type: "pie",
            radius: ["35%", "65%"],
            itemStyle: {
              normal: {
                label: {
                  position: "inner",
                  formatter: function(params) {
                    return (params.percent - 0).toFixed(0) + "%";
                  }
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: [
              {
                value: me.value1,
                name: "自动代扣"
              },
              {
                value: me.value2,
                name: "银行卡转账"
              },
              {
                value: me.value3,
                name: "支付宝转账"
              },
              {
                value: me.value4,
                name: "主动回款"
              }
            ]
          }
        ]
      };
      pie.setOption(option);
    }
  }
};
</script>

<style scoped>
</style>