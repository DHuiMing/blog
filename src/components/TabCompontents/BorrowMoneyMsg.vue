<!--借款信息-->
<template>
  <section style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-top: 10px"
    >
      <el-table-column :label="$t('tab.OrderNumber')" prop="orderNo" fixed width="250px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanAmount')" prop="amount" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanTenure')" prop="timeLimit" width="120px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.BorrowingTime')" prop="createTime" width="240px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.TotalFee')" prop="fee" width="120px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Actualamountreceived')" prop="realAmount" width="120px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Actualrepaymentamount')" prop="repayAmount" width="120px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" width="120px" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.penaltyDay}}</span>
        </template>
      </el-table-column>
      <!--<el-table-column :label="$t('table.status')" width="120px" fixed="right" align="center">-->
        <!--<template slot-scope="scope">-->
          <!--<span>{{ scope.row.state | stateFilter}}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->
    </el-table>
    <div>
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="currentPage"-->
      <!--:page-sizes="[10, 20, 30, 40]"-->
      <!--:page-size="10"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="total"-->
      <!--style="float: right;margin: 6px 10px 0 0">-->
      <!--</el-pagination>-->
    </div>
  </section>
</template>

<script>
export default {
  name: "borrow-money-msg",
  filters: {
    stateFilter(type) {
      let result;
      switch (type) {
        case "10":
          result = "待机审";
          break;
        case "12":
          result = "放款待活体";
          break;
        case "14":
          result = "人审待活体";
          break;
        case "20":
          result = "机审通过";
          break;
        case "21":
          result = "机审拒绝";
          break;
        case "22":
          result = "待复审";
          break;
        case "25":
          result = "复审挂起";
          break;
        case "26":
          result = "复审通过";
          break;
        case "27":
          result = "复审拒绝";
          break;
        case "28":
          result = "审核成功(待银程同意)";
          break;
        case "29":
          result = "银程同意(待放款)";
          break;
        case "30":
          result = "放款成功";
          break;
        case "31":
          result = "放款失败";
          break;
        case "40":
          result = "还款成功";
          break;
        case "41":
          result = "还款成功-金额减免";
          break;
        default:
          result = "-";
          break;
      }
      return result;
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      params: {
        current: 1,
        pageSize: 10000,
        userId: null,
        searchParams: {}
      },
      currentPage: 1
    };
  },
  props: ["userId"],
  created() {
    this.getData(this.userId);
  },
  methods: {
    getData(userId) {
      let _this = this;
      _this.listLoading = true;
      _this.params.userId = userId;
      _this
        .$axios({
          method: "post",
          url: "/manage/loanother/borrowLogList.htm",
          data: _this.params
        })
        .then(res => {
          _this.list = res.content.data;
          _this.total = res.content.page.total;
          setTimeout(() => {
            _this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(err => {});
    },
    handleSizeChange(val) {
      this.params.pageSize = val;
      this.params.current = 1;
      this.getList();
    },
    handleCurrentChange(val) {
      this.params.current = val;
      this.getList();
    }
  }
};
</script>

<style scoped>
</style>
