<template>
  <section>

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
      <el-table-column :label="$t('table.name')" prop="borrowName" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('table.phone')" prop="phone" fixed="left" align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('tab.Amount')" prop="amount" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.ApplyTime')" prop="borrowTime" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Loantime')" prop="disbursalTime" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Repaymentdate')" prop="repayTime" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="penaltyDay" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.Overduelevel')" prop="level" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Penaltycharge2')" prop="penaltyAmout" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.Collectionmember')" prop="userName" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.CreatTime')" prop="createTime" width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Theorderstatus')" fixed="right" width="150px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.state | typeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Info',scope.row)">{{$t('coll.handle')}}</el-button>
        </template>
      </el-table-column>
    </el-table>
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
    <detail-win
      v-if="detailWinShow"
      @refush="refush($event)"
      ref="deatilwin"
      v-on:closeWin="closeDetailWin"
    ></detail-win>
  </section>
</template>

<script>
import DetailWin from "@/components/TabCompontents/Details";
export default {
  name: "list",
  components: {
    DetailWin
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      let result =
        type == 11
          ? "待催收"
          : type == 20
          ? "催收中"
          : type == 30
          ? "承诺还款"
          : type == 40
          ? "催收成功"
          : type == 50
          ? "坏账"
          : "-";
      return result;
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      listLoadingFp: false,
      params: {
        current: 1,
        pageSize: 10,
        searchParams: {}
      },
      currentPage: 1,
      detailWinShow: false,
      power: "",
      actionList: "",
      dialogFormVisible: false,
      form: {
        collectionId: ""
      },
      isDisabled: true,
      allotManList: null,
      allotManListShow: false,
      formLabelWidth: "120px",
      actionPlBtn: "",
      p7: false,
      checkCollection: "", //选中单子的id   分配催收人员时用到
      checkCollections: "", //选中单子的id   分配催收人员时用到  批量
      fp: "分配"
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
    this.actionPlBtn = this.getPlBtn(this.$route.params);
    // if(this.actionPlBtn){
    this.p7 = true;
    this.plAction();
    // }
  },
  methods: {
    // 操作
    getActionList(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[4] &&
        list.BtnPermList[4].length
      ) {
        return list.BtnPermList[4];
      }
    },
    /*新增*/
    getPlBtn(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[7] &&
        list.BtnPermList[7].length
      ) {
        return list.BtnPermList[7];
      }
    },
    getdialogFormVisible(data) {},
    changeData(p) {
      this.params.searchParams = JSON.stringify(p);
      this.getList();
    },
    // 获取列表
    getList(list) {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/collSelfOrder/collectionList.htm",
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
    checkboxInit(row, index) {
      if (row.state == 40) return 0;
      //不可勾选
      else return 1; //可勾选
    },
    handleSelectionChange(val) {
      if (val.length > 0) {
        this.isDisabled = false;
      } else {
        this.isDisabled = true;
      }
      let checkArray = [];
      for (let i in val) {
        checkArray.push(val[i].id);
      }
      this.checkCollections = checkArray;
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
          this.$refs.deatilwin.getUserInfo(row,'collecting');
          // this.$router.push({path:'/UserDetails',query:{userId:row.userId}})
        }, 0.5 * 1000);
      } else if (actionTag == "Allot") {
         this.dialogFormVisible = true;
        this.fp = "分配";
      }
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
          method: "post",
          url: "/manage/collManage/collDropDownList.htm"
        })
        .then(res => {
          _this.allotManList = res.content.collUserList;
          _this.allotManListShow = true;
          // setTimeout(() => {
          //     _this.dialogFormVisible = true;
          // }, 0.2 * 1000)
        })
        .catch(err => {});
    },
    plfp() {
      this.dialogFormVisible = true;
      this.fp = "批量分配";
    },
    ensure() {
      if (!this.form.collectionId) {
        this.$message("请选择分配人");
        return;
      }
      let _this = this,
        id,
        codeUrl;

      if (_this.fp == "分配") {
        codeUrl = "/manage/collWarning/allotUser.htm";
        id = _this.checkCollection;
      } else {
        codeUrl = "/manage/collWarning/batchAllotUser.htm";
        let needId = [];
        for (let j in _this.checkCollections) {
          needId.push(_this.checkCollections[j]);
        }
        needId;
        id = needId.toString();
        // id=JSON.stringify(_this.checkCollections)
      }
      let user = {
        id: id,
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
  .el-table__fixed-right {
    z-index: 0;
  }
}
</style>
