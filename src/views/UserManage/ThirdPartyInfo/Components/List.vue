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
      <el-table-column :label="$t('table.name')" prop="name" width="200px" fixed align="center"></el-table-column>
      <el-table-column :label="$t('table.phone')" prop="phone" fixed="left" align="center" width="120px"></el-table-column>
      <el-table-column label="whatsapp" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.whatsappAuth ==1 ? $t('tab.certified'): scope.row.whatsappAuth ==0 ? $t('tab.unauthorized'): '-' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="facebook" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.facebookAuth ==1 ? $t('tab.certified'): scope.row.facebookAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="operator" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.operatorAuth ==1 ? $t('tab.certified'): scope.row.operatorAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Uber" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.uberAuth ==1 ? $t('tab.certified'): scope.row.uberAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Ola" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.olaAuth ==1 ? $t('tab.certified'): scope.row.olaAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Amazon" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.amazonAuth ==1 ? $t('tab.certified'): scope.row.amazonAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="LinkedIn" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.linkedInAuth ==1 ? $t('tab.certified'): scope.row.linkedInAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="GooglePlay" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.googlePlayAuth ==1 ? $t('tab.certified'): scope.row.googlePlayAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Instagram" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.instagramAuth ==1 ? $t('tab.certified'): scope.row.instagramAuth ==0 ? $t('tab.unauthorized'): '-'}}</span>
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
  </section>
</template>

<script>
export default {
  name: "list",
  components: {},
  filters: {
    typeFilter(type) {
      let result;
      if (type == 1) {
        result = "已认证";
      } else if (type == 0) {
        result = "未认证";
      } else {
        result = "-";
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
      actionPlBtn: ""
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
          url: "/manage/user/ScorpionCrawlingAuthList.htm",
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
