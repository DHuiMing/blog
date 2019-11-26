<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        size="small"
        type="primary"
        @click="plfp"
        class="people"
      >{{$t('tab.Assigncreditauditors')}}</el-button>
      <el-dialog  :visible.sync="dialogFormVisible" v-loading="listLoadingFp">
        <el-form :model="form">
          <el-form-item :label="$t('tab.Assigncreditauditors')" label-width="200px">
            <el-select v-model="form.collectionId" placeholder>
              <el-option
                v-for="item in allotManList"
                :key="item.id"
                :label="item.userName"
                :value="item.userId+'|'+item.userName"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('tips.cancel')}}</el-button>
          <el-button type="primary" @click="ensure">{{$t('tips.confirm')}}</el-button>
        </div>
      </el-dialog>
      <el-button
        size="small"
        type="primary"
        @click="dialogxsVisible = true"
      >{{$t('tab.Letteronstatistical')}}</el-button>
      <el-dialog width="500px" :visible.sync="dialogxsVisible">
        <div v-if="manageAuditLogCount">
          <el-row style="padding: 10px 0">
            <el-col :span="12"><div>{{$t('tab.platformAuditAmout')}} : {{manageAuditLogCount.platformAuditAmout}}</div></el-col>
            <el-col :span="12"><div>{{$t('tab.platformTotalAuditAmout')}} ：{{manageAuditLogCount.platformTotalAuditAmout}}</div></el-col>
          </el-row>
          <el-row style="padding: 10px 0">
            <el-col :span="12"><div>{{$t('tab.auditAmount')}} ：{{manageAuditLogCount.auditAmount}}</div></el-col>
            <el-col :span="12"><div>{{$t('tab.totalAuditAmount')}} ：{{manageAuditLogCount.totalAuditAmount}}</div></el-col>
          </el-row>
          <el-row style="padding: 10px 0">
            <el-col :span="12"><div>{{$t('tab.passAmount')}} ：{{manageAuditLogCount.passAmount}}</div></el-col>
            <el-col :span="12"><div>{{$t('tab.totalPassAmount')}} ：{{manageAuditLogCount.totalPassAmount}}</div></el-col>
          </el-row>
          <el-row style="padding: 10px 0">
            <el-col :span="12"><div>{{$t('tab.rejectAmount')}} ：{{manageAuditLogCount.rejectAmount}}</div></el-col>
            <el-col :span="12"><div>{{$t('tab.totalRejectAmount')}} ：{{manageAuditLogCount.totalRejectAmount}}</div></el-col>
          </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogxsVisible = false">关闭</el-button>
        </div>
      </el-dialog>
    </div>
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
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column :label="$t('table.name')" prop="name" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('table.phone')" align="center" prop="phone" fixed width="150px"></el-table-column>
      <!-- <el-table-column :label="$t('tab.OrderNumber')" prop="orderNumber" fixed width="180px" align="center"></el-table-column> -->
      <el-table-column :label="$t('tab.LoanAmount')" prop="loanAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.LoanTenure')" prop="loanTenure" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Arrivalamount')" prop="disbursalAmount" width="180px" align="center"></el-table-column>
      <!-- <el-table-column :label="$t('tab.poundage')" prop="processingFee" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('interests')" prop="interest" width="180px" align="center"></el-table-column>-->
      <el-table-column :label="$t('tab.RepaymentAmount')" prop="repaymentAmount" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.ApplyTime')" prop="applyTime" width="180px" align="center"></el-table-column>
      <!-- <el-table-column :label="$t('tab.Penaltycharge')" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidAmout')" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.ReceiptTime')" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Repaymentdate')" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidTime')" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>-->
      <!-- <el-table-column label="渠道" prop="channel" width="180px" align="center"></el-table-column> -->
      <el-table-column :label="$t('tab.UserGroup')" prop="userGroup" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? $t('tab.Oldcustomers'):$t('tab.Newcustomers')}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('tab.Theorderstatus')" fixed="right" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ allBorrowState[scope.row.status]}}</span>
        </template>
      </el-table-column>-->
      <el-table-column :label="$t('table.Operating')" fixed="right" width="400px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Info',scope.row)">{{$t('tem.Check')}}</el-button>
          <el-button type="primary" size="mini" @click="handleAction('Verify',scope.row)">{{$t('tab.Recheck')}}</el-button>
          <el-button type="primary" size="mini" @click="handleAction('Allot',scope.row)">{{$t('tab.Allocation')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
    <detail-win
      v-if="detailWinShow"
      ref="deatilwin"
      @refush="refush($event)"
      v-on:closeWin="closeDetailWin"
    ></detail-win>
  </section>
</template>
<script>
import DetailWin from "@/components/TabCompontents/Details";
export default {
  name: "list",
  components: { DetailWin },
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
          state: "22"
        }
      },
      form: {
        collectionId: ""
      },
      dialogxsVisible:false,
      detailWinShow: false,
      formInit: {},
      contractUrl: "",
      famline: {},
      listLoadingFp: false,
      currentPage: 1,
      dialogFormVisible: false,
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
      },
      isDisabled: true,
      allotManList: null,
      fp: "分配",
      formLabelWidth: "120px",
      manageAuditLogCount: null,
      checkCollection: "", //选中单子的id   分配催收人员时用到
      checkCollections: "" //选中单子的id   分配催收人员时用到  批量
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
    this.plAction();
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
      _this
        .$axios({
          method: "post",
          url: "/manage/risk/manageAuditLogCount.htm",
          data: {searchParams:''}
        })
        .then(res => {
          _this.manageAuditLogCount = res.content.data
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
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      let checkArray = [];
      for (let i in val) {
        checkArray.push(val[i].borrowId);
      }
      this.checkCollections = checkArray;
    },
    handleAction(actionTag, row) {
      if (actionTag == "Info") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo(row, "详情");
          // this.$router.push({path:'/UserDetails',query:{userId:row.userId,borrowId:row.borrowId,title:'复审'}})
        }, 0.5 * 1000);
      } else if (actionTag == "Verify") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo(row, "复审");
          // this.$router.push({path:'/UserDetails',query:{userId:row.userId,borrowId:row.borrowId,title:'复审'}})
        }, 0.5 * 1000);
      } else if (actionTag == "Allot") {
        //分配
        this.dialogFormVisible = true;
        this.checkCollection = row.borrowId;
        this.fp = "分配";
      }
    },
    plfp() {
      this.dialogFormVisible = true;
      this.fp = "批量分配";
    },
    handleClose() {
      this.dialogFormVisible = false;
    },
    closeDetailWin() {
      this.detailWinShow = false;
    },
    refush() {
      this.closeDetailWin();
      this.getList();
    },
    plAction() {
      let _this = this;
      _this
        .$axios({
          method: "get",
          url: "/manage/risk/searchAllotManList.htm"
        })
        .then(res => {
          _this.allotManList = res.content.allotManList;
        })
        .catch(err => {});
    },
    ensure() {
      if (!this.form.collectionId) {
        this.$message("请选择分配人");
        return;
      }
      let _this = this,
        id,
        codeUrl;
      // _this.listLoadingFp = true;
      if (_this.fp == "分配") {
        codeUrl = "/manage/risk/allotBorrowOrder.htm";
        id = _this.checkCollection;
      } else {
        codeUrl = "/manage/risk/allotBorrowOrder.htm";
        let needId = [];
        for (let j in _this.checkCollections) {
          needId.push(_this.checkCollections[j]);
        }
        needId;
        id = needId.toString();
        // id=JSON.stringify(_this.checkCollections)
      }
      let user = {
        borrowMainIds: id,
        userId: _this.form.collectionId.split("|")[0],
        userName: _this.form.collectionId.split("|")[1]
      };
      _this
        .$axios({
          method: "post",
          url: codeUrl,
          data: user
        })
        .then(res => {
          _this.$message("分配成功");
          // _this.params.searchParams=JSON.stringify(_this.params.searchParams)
          _this.getList(this.params);
          setTimeout(() => {
            _this.dialogFormVisible = false;
            _this.listLoadingFp = false;
          }, 0.5 * 1000);
        })
        .catch(err => {});
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
