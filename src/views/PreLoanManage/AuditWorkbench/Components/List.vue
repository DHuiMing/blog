<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        size="small"
        type="primary"
        @click="plfp"
        class="people"
      >批量分配</el-button>
      <el-dialog :title="fp" :visible.sync="dialogFormVisible" v-loading="listLoadingFp">
        <el-form :model="form">
          <el-form-item label="分配信审人员" :label-width="formLabelWidth">
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="ensure">确 定</el-button>
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
      <el-table-column label="到帐金额" prop="disbursalAmount" width="180px" align="center"></el-table-column>
      <!-- <el-table-column label="手续费" prop="processingFee" width="180px" align="center"></el-table-column>
      <el-table-column label="利息" prop="interest" width="180px" align="center"></el-table-column>-->
      <el-table-column label="应还金额" prop="repaymentAmount" width="180px" align="center"></el-table-column>
      <el-table-column label="下单时间" prop="applyTime" width="180px" align="center"></el-table-column>
      <!-- <el-table-column label="逾期费用" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column label="已还金额" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <el-table-column label="到账时间" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column label="应还日期" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column label="实际还款时间" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>-->
      <!-- <el-table-column label="渠道" prop="channel" width="180px" align="center"></el-table-column> -->
      <el-table-column label="客群" prop="userGroup" width="180px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? '老客':'新客'}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('tab.Theorderstatus')" fixed="right" width="200px" align="center">
        <template slot-scope="scope">
          <span>{{ allBorrowState[scope.row.status]}}</span>
        </template>
      </el-table-column>-->
      <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Info',scope.row)">{{$t('tem.Check')}}</el-button>
          <el-button type="primary" size="mini" @click="handleAction('Verify',scope.row)">复审</el-button>
          <el-button type="primary" size="mini" @click="handleAction('Allot',scope.row)">分配</el-button>
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
      },
      isDisabled: true,
      allotManList: null,
      fp: "分配",
      formLabelWidth: "120px",
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
        .then(res => {})
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
