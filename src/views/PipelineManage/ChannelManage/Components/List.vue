<template>
  <section>
    <!-- <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        v-for="item in actionPlBtn"
        :key="item.value"
        @click="topAction(item)"
        size="small"
        type="primary"
      >{{item.label}}</el-button>
    </div> -->
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 50px;"
    >
      <el-table-column label="渠道编码" prop="code" fixed align="center" width="150px"></el-table-column>
      <el-table-column label="渠道名称" prop="name" fixed align="center" width="120px"></el-table-column>
      <el-table-column label="联系人" prop="linker" width="220px" align="center"></el-table-column>
      <el-table-column label="联系人" prop="phone" width="220px" align="center"></el-table-column>
      <el-table-column label="创建时间" prop="createTime" width="220px" align="center"></el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.state==10?"启用" : scope.row.state==20 ? "禁用" : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <span v-for="(item,index) in actionList" :key="index" style="padding: 0 4px">
            <el-button
              v-if="item.label.indexOf('|') > -1 & (scope.row.state==10)"
              type="primary"
              size="mini"
              @click="handleAction(item,scope.row)"
            >{{item.label.split('|')[1]}}</el-button>
            <el-button
              v-else-if="item.label.indexOf('|') > -1 & (scope.row.state!=10)"
              type="primary"
              size="mini"
              @click="handleAction(item,scope.row)"
            >{{item.label.split('|')[0]}}</el-button>
            <el-button
              v-else
              type="primary"
              size="mini"
              @click="handleAction(item,scope.row)"
            >{{item.label}}</el-button>
          </span>
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

    <el-dialog
      title="新增"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :before-close="handleClose"
      v-loading="formLoading"
    >
      <el-form :model="formInit" style="margin-right: 20px" ref="form">
        <el-row :gutter="20">
          <!--<el-col :span="11">-->
          <!--<el-form-item label="" prop="id" :label-width="formLabelWidth">-->
          <!--<el-input v-model="formInit.name" autocomplete="off"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="11">
            <el-form-item
              label="渠道编码："
              prop="code"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '渠道编码不能为空'}]"
            >
              <el-input v-model="formInit.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="渠道名称："
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '渠道方式不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="联系人姓名："
              prop="linker"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '联系人姓名不能为空'}]"
            >
              <el-input v-model="formInit.linker" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="联系方式："
              prop="phone"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '联系方式不能为空'}]"
            >
              <el-input v-model="formInit.phone" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="height: 60px">
          <el-form-item style="float: right;margin-top: 20px">
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="ensure('form')">确 定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
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
      let result = "";
      return result;
    }
  },
  props: ["allList"],
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
          state: 22
        }
      },
      currentPage: 1,
      detailWinShow: false,
      power: null,
      actionList: null,
      actionPlBtn: null,
      isDisabled: false,
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formInit: {
        id: "",
        code: "",
        name: "",
        linker: "",
        phone: ""
      },
      formLoading: false,
      topUrl: ""
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
    this.actionPlBtn = this.getPlBtn(this.$route.params);
  },
  methods: {
    hideWin() {
      this.detailWinShow = false;
    },
    getActionList(list) {
      if (
        list.BtnPermList &&
        list.BtnPermList[4] &&
        list.BtnPermList[4].length
      ) {
        return list.BtnPermList[4];
      }
    },
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
    getList() {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/channel/channelList.htm",
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
      if (actionTag == "Edit") {
        this.topUrl = "/manage/channel/saveOrUpdate.htm";
        this.rest();
        this.formInit.id = row.id;
        this.formInit.code = row.code;
        this.formInit.name = row.name;
        this.formInit.linker = row.linker;
        this.formInit.phone = row.phone;
        this.dialogFormVisible = true;
      } else if (actionTag == "Lock") {
        let state = row.state == 10 ? "停用" : "启用";
        this.$confirm("是否确定" + state, "提示", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/channel/updateState.htm",
                data: { id: row.id, state: row.state == 10 ? 20 : 10 }
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
    closeDetailWin() {
      this.detailWinShow = false;
    },
    refush() {
      this.closeDetailWin();
      this.getList();
    },
    topAction(actionTag) {
      this.topUrl = "/manage/channel/saveOrUpdate.htm";
      if (actionTag == "Add") {
        this.dialogFormVisible = true;
        this.rest();
      }
    },
    rest() {
      this.formInit.id = "";
      this.formInit.code = "";
      this.formInit.name = "";
      this.formInit.linker = "";
      this.formInit.phone = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          _this.formLoading = true;
          if (!_this.formInit.id) {
            delete _this.formInit.id;
            _this.formInit.state = 10;
          }
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
            .catch(err => {});
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