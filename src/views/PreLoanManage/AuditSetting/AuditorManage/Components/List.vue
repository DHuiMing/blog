<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        size="small"
        type="primary"
        @click="plAction"
        class="people"
      >{{$t('tab.Addauditors')}}</el-button>
      <el-dialog title="" :visible.sync="dialogFormVisible" v-loading="winLoad">
        <el-form :model="form">
          <el-form-item :label="$t('tab.Addauditors')"  :label-width="formLabelWidth">
            <el-select v-model="form.userIds" multiple placeholder>
              <el-option
                v-for="(item,index) in careFull"
                :key="index"
                :label="item.userName"
                :value="item.userId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('tips.cancel')}}</el-button>
          <el-button type="primary" @click="submitBtn">{{$t('tips.confirm')}}</el-button>
        </div>
      </el-dialog>
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
      <el-table-column :label="$t('table.name')" prop="userName" fixed align="center"></el-table-column>
      <!-- <el-table-column label="更新时间" prop="createTime" align="center"></el-table-column> -->
      <el-table-column :label="$t('tab.CreatTime')" prop="createTime" align="center"></el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 1? $t('tips.Enabled') : $t('tips.Disable') }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="250px" align="center">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status==1"
            type="primary"
            size="mini"
            @click="handleAction('Lock',scope.row)"
          >{{$t('tips.Disable')}}</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>
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
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      let result = type == 1 ? "启用" : type == 0 ? "禁用" : "";
      return result;
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
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
        userIds: []
      },
      isDisabled: false,
      formLabelWidth: "120px",
      actionPlBtn: "",
      careFull: "", //信审人员数据
      winLoad: false //批量添加信审人员加载动画
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
    this.actionPlBtn = this.getPlBtn(this.$route.params);
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
    /*批量添加信审人员*/
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
          url: "/manage/risk/userExamineList.htm",
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
      if (actionTag == "Info") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo(item.code, row);
        }, 0.5 * 1000);
      } else if (actionTag == "Lock") {
        let state = row.status == 1 ? this.$t('tips.Disable') : this.$t('tips.Enabled');
        this.$confirm(this.$t('tips.Areyousureto') + state, "", {
          confirmButtonText: _this.$t("tips.confirm"),
          cancelButtonText: _this.$t("tips.cancel"),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/risk/userExamineUpdateState.htm",
                data: { id: row.id, state: row.status == 0 ? "1" : "0" }
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: state + "成功!"
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
      }
    },
    plAction() {
      let _this = this;
      _this.form = {
        userIds: []
      };
      _this
        .$axios({
          method: "get",
          url: "/manage/risk/searchUnselectedExamine.htm"
        })
        .then(res => {
          _this.careFull = res.content;
          setTimeout(() => {
            _this.dialogFormVisible = true;
          }, 0.2 * 1000);
        })
        .catch(err => {});
    },
    submitBtn() {
      let _this = this;
      _this.winLoad = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/risk/examineSave.htm",
          data: { userIds: _this.form.userIds.toString() }
        })
        .then(res => {
          _this.$message("操作成功");
          _this.getList();
          setTimeout(() => {
            _this.dialogFormVisible = false;
            _this.winLoad = false;
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
