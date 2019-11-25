<template>
  <!-- //应用列表 -->
  <section style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto">
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column :label="$t('tab.Theapplicationname')" prop="appName" fixed width="200px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Theapplicationpackagename')" prop="packageName" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Systembuiltinidentification')" prop="iexpress" width="120px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.iexpress == 0?'第三方应用':'系统内置内应用'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Systemtype')" prop="systemType" width="240px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.systemType == 1?'IOS':'Android'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Creationtime')" prop="gmtCreateTime" width="240px" fixed="right" align="center"></el-table-column>
    </el-table>
    <div>
      <!-- 系统内置标识(0:第三方应用,1.系统内置内应用)
系统类型（1.IOS,2.Android） -->
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
  name: "application",
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
          url: "/manage/loanother/userAppList.htm",
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
