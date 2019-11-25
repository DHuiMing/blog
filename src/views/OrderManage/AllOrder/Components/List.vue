<template>
  <section>
    <div class="pagination-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        class="pag-list"
      ></el-pagination>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 50px;"
    >
      <el-table-column :label="$t('table.name')" prop="name" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('table.phone')" align="center" prop="phone" fixed width="150px"></el-table-column>
      <el-table-column :label="$t('tab.OrderNumber')" prop="orderNumber" fixed width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanAmount')" prop="loanAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanTenure')" prop="loanTenure" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Loanamount')" prop="disbursalAmount" width="180px" align="center"></el-table-column>
      <el-table-column label="应还金额" prop="repaymentAmount" width="180px" align="center"></el-table-column>
      <el-table-column label="逾期费用" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column label="已还金额" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <el-table-column label="下单时间" prop="applyTime" width="180px" align="center"></el-table-column>
      <el-table-column label="到账时间" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column label="应还日期" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column label="实际还款时间" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>
      <el-table-column label="客群" prop="userGroup" width="180px" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? '老客':'新客'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Theorderstatus')" fixed="right" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ allBorrowState[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
        <template slot-scope="scope"></template>
      </el-table-column> -->
    </el-table>

    <el-dialog
      width="800px"
      style="overflow: auto;"
      title
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :before-close="handleClose"
      v-loading="formLoading"
    >
      <iframe width="750px" height="600px" v-if="formInit.protocolUrl" :src="formInit.protocolUrl"></iframe>

      <div v-else>
        <div
          style="text-align: center;height: 500px;line-height: 300px;font-size: 30px;font-weight: bold;"
        >暂无</div>
      </div>
    </el-dialog>
    <detail-win v-if="detailWinShow" ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win>
  </section>
</template>
<script>
import DetailWin from "./DetailWin";
export default {
  name: "list",
  components: {
    DetailWin
  },
  filters: {},
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      params: {
        current: 1,
        pageSize: 10,
        searchParams: {}
      },
      formInit: {},
      contractUrl: "",
      famline: {},
      formLoading: false,
      currentPage: 1,

      dialogFormVisible: false,
      detailWinShow: false,
      power: null,
      actionList: null,
      allBorrowState: {
        "10": "申请成功待审核",
        "20": "自动审核通过",
        "21": "自动审核不通过",
        "22": "自动审核未决待人工复审",
        "25": "人工复审挂起",
        "26": "人工复审通过",
        "27": "人工复审不通过",
        "30": "放款成功",
        "31": "放款失败",
        "40": "还款成功",
        "41": "还款成功-金额减免",
        "45": "还款中",
        "50": "逾期",
        "90": "坏账"
      }
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
  },
  methods: {
    getActionList(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[4] &&
        list.BtnPermList[4].length
      ) {
        return list.BtnPermList[4];
      }
    },
    changeData(p) {
      this.params.searchParams = JSON.stringify(p);
      this.getList();
    },
    getList() {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/loan/borrowList.htm",
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
    },
    handleAction(item, row) {
      if (item.actionTag == "Info") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo(item.code, row);
        }, 0.5 * 1000);
      } else if (item.actionTag == "Agreement") {
        let _this = this;
        _this.listLoading = true;
        _this.$axios.post({
          url: "/manage/loan/borrowAgreement.htm",
          data: { borrowMainId: row.id, userId: row.userId },
          callback(res) {
            if (res.content.contractUrl) {
              _this.src = pdf.createLoadingTask(res.content.protocolUrl);
            }
            _this.listLoading = false;
            _this.dialogFormVisible = true;
            _this.formInit = res.content;
            // console.log(_this.formInit)
          }
        });
      } else if (item.actionTag == "PayAgain") {
        let _this = this;
        this.$confirm("是否确定再次支付", "提示", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this.$axios.post({
              url: "/manage/loan/borrowPayAgain.htm",
              data: { borrowMainId: row.id },
              callback(res) {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: "再次支付成功!"
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消该操作"
            });
          });
      }
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    closeDetailWin() {
      this.detailWinShow = false;
    }
  },
  watch: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.pagination-box {
  position: absolute;
  bottom: 0px;
  padding: 10px;
  border-radius: 4px;
  background-color: #fff;
  width: 100%;
  margin-right: 10px;
  .pag-list {
    float: right;
    margin-right: 100px;
  }
}
.el-dialog__body {
  /*height: 80vh!important;*/
}
</style>
