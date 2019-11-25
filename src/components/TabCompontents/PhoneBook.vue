<template>
  <section style="background-color: #fff;padding-top: 10px;height: 60vh;overflow: auto">
    <el-table v-loading="listLoading" :key="tableKey" :data="list" style="width: 100%;">
      <el-table-column :label="$t('table.name')" prop="name" fixed align="center"></el-table-column>
      <el-table-column :label="$t('table.phone')" prop="phone" align="center"></el-table-column>
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
  name: "phone-book",
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
  props: ["userId", "tableUrl"],
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
          url: "/manage/loanother/userContactsList.htm",
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
