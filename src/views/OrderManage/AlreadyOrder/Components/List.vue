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
      <!-- <el-table-column :label="$t('tab.OrderNumber')" prop="orderNumber" fixed width="180px" align="center"></el-table-column> -->
      <el-table-column :label="$t('tab.LoanAmount')" prop="loanAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanTenure')" prop="loanTenure" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Loanamount')" prop="disbursalAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaymentAmount')" prop="repaymentAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Penaltycharge')" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidAmout')" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <!-- <el-table-column :label="$t('tab.ApplyTime')" prop="applyTime" width="180px" align="center"></el-table-column> -->
      <el-table-column :label="$t('tab.ReceiptTime')" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Repaymentdate')" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidTime')" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>
      <!-- <el-table-column :label="$t('tab.UserGroup')" prop="userGroup" width="180px" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? '老客':'新客'}}</span>
        </template>
      </el-table-column> -->
      <el-table-column :label="$t('tab.Theorderstatus')" fixed="right" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ allBorrowState[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Info',scope.row)">{{$t('tem.Check')}}</el-button>
        </template>
      </el-table-column>
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
        searchParams: {
          state:'40,41'
        }
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
        "10": this.$t('tab.Apply'),
        "20": this.$t('tab.AutoReviewPass'),
        "21": this.$t('tab.AutoReviewRefuse'),
        "22": this.$t('tab.Reviewing'),
        "25": this.$t('tab.ReviewHangup'),
        "26": this.$t('tab.ReviewPass'),
        "27": this.$t('tab.ReviewRefuse'),
        "30": this.$t('tab.LoanSuccess'),
        "31": this.$t('tab.LoanFail'),
        "40": this.$t('tab.Repayed'),
        "41": this.$t('tab.RepayedReduced'),
        "45": this.$t('tab.Repaying'),
        "50": this.$t('tab.Overdue'),
        "90": this.$t('tab.BadDebt')
      }
    };
  },
  computed: {},
  mounted() {},
  created() {
     this.params.searchParams = JSON.stringify(this.params.searchParams);
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
    handleAction(actionTag, row) {
      if (actionTag == "Info") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo('', row);
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
        this.$confirm("是否确定再次支付", "", {
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
