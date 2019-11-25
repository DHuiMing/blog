<template>
  <div>
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="80%"
      top="10vh"
      :before-close="handleClose"
    >
      <el-form ref="form" label-width="100px" v-if="isShow">
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tab.OrderNumber')">
              <el-input disabled v-model="rowList.accountNumber"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('table.name')">
              <el-input disabled v-model="rowList.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('table.phone')">
              <el-input disabled v-model="rowList.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="$t('tab.LoanTenure')">
              <el-input disabled v-model="rowList.loanTenure"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="借款地址">
              <el-input disabled v-model="rowList.borrowingAddress"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="借款地址经纬度">
              <el-input disabled v-model="rowList.geographicCoordinates"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tab.LoanAmount')">
              <el-input disabled v-model="rowList.loanAmount"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手续费">
              <el-input disabled v-model="rowList.processingFee"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <!-- <el-col :span="12">
            <el-form-item label="逾期费用">
              <el-input disabled v-model="rowList.penaltyCharge"></el-input>
            </el-form-item>
          </el-col> -->
          <el-col :span="12">
            <el-form-item :label="$t('tab.Loanamount')">
              <el-input disabled v-model="rowList.disbursalAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tab.BorrowingTime')">
              <el-input disabled v-model="rowList.applyTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="放款时间">
              <el-input disabled v-model="rowList.receiptTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item :label="$t('tab.DaysOverdue')">
              <el-input disabled v-model="rowList.daysOverdue"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="逾期金额">
              <el-input disabled v-model="rowList.penaltyCharge"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="应还时间">
              <el-input disabled v-model="rowList.repaymentDate"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="应还金额">
              <el-input disabled v-model="rowList.repaymentAmount"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
         <el-row>
          <el-col :span="12">
            <el-form-item label="已还时间">
              <el-input disabled v-model="rowList.repaidTime"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="已还金额">
              <el-input disabled v-model="rowList.repaidAmout"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "detailWin",
  data() {
    return {
      isShow: false,
      dialogVisible: false,
      rowList: null
    };
  },
  components: {},
  mounted() {},
  methods: {
    getUserInfo(code, data) {
      let _this = this;
      _this.dialogVisible = true;
      _this.rowList = data;
      _this.isShow = true;
    },
    handleClose(done) {
      let _this = this;
      this.$confirm(_this.$t('tab.Confirmshutdown'))
        .then(_ => {
          _this.$emit("closeWin", true);
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>

<style scoped>
</style>
