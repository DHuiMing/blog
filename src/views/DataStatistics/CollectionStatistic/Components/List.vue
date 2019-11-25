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
    >
      <el-table-column label="日期" prop="time" width="200px" fixed align="center" ></el-table-column>
      <el-table-column label="应还订单" prop="allocationOrder" fixed="left" align="center" width="120px"></el-table-column>
      <el-table-column label="入催订单" prop="collectedOrder" width="200px" align="center"></el-table-column>
      <el-table-column label="催回订单" prop="collectedOrder" width="200px" align="center"></el-table-column>
      <el-table-column label="催回率1天" prop="collection1" width="200px" align="center"></el-table-column>
       <el-table-column label="催回率3天" prop="collection3" width="200px" align="center"></el-table-column>
      <el-table-column label="催回率7天" prop="collection7" width="200px" align="center"></el-table-column>
      <el-table-column label="催回率15天" prop="collection15" width="200px" align="center"></el-table-column>
      <el-table-column label="催回率" prop="collectionRate" fixed="right"  align="center"></el-table-column>
      <el-table-column label="首逾率" prop="firstOverdueRate" fixed="right"  align="center"></el-table-column>
      <el-table-column label="逾期率" prop="overdueRate" fixed="right"  align="center"></el-table-column>
      
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
  </section>
</template>

<script>
export default {
  name: "list",
  components: {
 
  },
  filters: {
  

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
      isDisabled: true,
      allotManList: null,
      allotManListShow: false,
      formLabelWidth: "120px",
      actionPlBtn: "",
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
    this.actionPlBtn = this.getPlBtn(this.$route.params);
    // if(this.actionPlBtn){
    // this.p7 = true;
    // this.plAction();
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
          url: "/manage/statistic/collorderCount.htm",
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