<template>
  <section>
    <!-- <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button :disabled="isDisabled" @click="topAction('Add')" size="small" type="primary">{{$t('tab.Add')}}</el-button>
    </div> -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
    >
      <el-table-column :label="$t('table.name')" prop="name" fixed align="center" width="150px"></el-table-column>
      <el-table-column :label="$t('table.phone')" prop="phone" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('tem.processname')"  prop="kudosService" width="220px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.OrderNumber')" prop="orderNo" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.BorrowingTime')" prop="borrowCreateTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.CreatTime')" prop="kudosCreateTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{scope.row.success? 'true': 'false'}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="200px" align="center">
        <template slot-scope="scope">
          <!-- <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>  -->
          <el-button v-if="!scope.row.success" type="primary" size="mini" @click="handleAction('Again',scope.row)">{{$t('tem.Topush')}}</el-button>
          <!-- <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>  -->
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
  },
  props: ["allList"],
  data() {
    return {
      isEdit: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      params: {
        current: 1,
        pageSize: 10,
        searchParams: {
        }
      },
      currentPage: 1,
      power: null,
      actionList: null,
      actionPlBtn: null,
      isDisabled: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formInit: {
        id: "",
        value: "",
        codeType: ""
      },
      formLoading: false,
      topUrl: "",
      p7: false
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.getList();
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.actionList = this.getActionList(this.$route.params);
    this.actionPlBtn = this.getPlBtn(this.$route.params);
    if (this.actionPlBtn) {
      this.p7 = true;
    }
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
    //新增
    getPlBtn(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[7] &&
        list.BtnPermList[7].length
      ) {
        return list.BtnPermList[7];
      }
    },
    changeData(p) {
      this.params.searchParams = JSON.stringify(p);
      this.getList();
    },
    // 获取列表
    getList() {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/kudos/flowList.htm",
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
      let _this = this;
      if (actionTag == "Again") {
        this.$confirm("是否确定重新推送", "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/kudos/kudosExecute.htm",
                data: { borrowId: row.borrowId}
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "info",
                  message: res.content.content
                });
              })
              .catch(err => {});
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消该操作"
            });
          });
      } else if (actionTag == "Run") {
      }
    },
    topAction(actionTag) {
      this.topUrl = "/manage/risk/saveOrUpdRefuseCause.htm";
      if (actionTag == "Add") {
        this.isEdit = false;
        this.dialogFormVisible = true;
        this.rest();
      }
    },
    rest() {
      this.formInit.id = "";
      this.formInit.value = "";
      this.formInit.codeType = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          console.log(_this.topUrl)
          _this.formLoading = true;
          _this
            .$axios({
              method: "post",
              url: _this.topUrl,
              data: _this.formInit
            })
            .then(res => {
              _this.formLoading = false;
              _this.getList();
              _this.dialogFormVisible = false;
            })
            .catch(err => {
              _this.formLoading = false;
              _this.dialogFormVisible = false;
            });
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.dialogFormVisible = false;
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
</style>
