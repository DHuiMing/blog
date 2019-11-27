<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        @click="topAction('Add')"
        size="small"
        type="primary"
      >{{$t('tab.Add')}}</el-button>
    </div>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;padding-bottom: 50px"
    >
      <el-table-column :label="$t('tem.Taskname')" prop="name" fixed align="center" width="200px"></el-table-column>
      <el-table-column :label="$t('tem.TaskIdentification')" prop="code" fixed align="center" width="200px"></el-table-column>
      <el-table-column :label="$t('tem.Taskcycle')" prop="cycle" width="220px" align="center"></el-table-column>
      <el-table-column
        :label="$t('tem.Taskmethodname')"
        :show-overflow-tooltip="true"
        prop="className"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column :label="$t('tab.CreatTime')" prop="createTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Lastexecutiontime')" prop="lastStartTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Numberofsuccessful')" prop="roleName" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Defeated')" prop width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tem.Successrateated')" prop="fail" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.state==10)?$t('tips.Enabled') : (scope.row.state==20) ? $t('tips.Disable') : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="400px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>
           <el-button v-if="scope.row.state==20" type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>
            <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Disable')}}</el-button>
             <el-button type="primary" size="mini" @click="handleAction('Run',scope.row)">{{$t('tem.Executeonceimmediately')}}</el-button>
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
      @hideWin="hideWin($event)"
      ref="deatilwin"
      v-on:closeWin="closeDetailWin"
    ></detail-win>
    <el-dialog
      title="新增"
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :before-close="handleClose"
      v-loading="formLoading"
    >
      <el-form :model="formInit" style="margin-right: 20px" ref="form">
        <el-row :gutter="20">
          <el-col :span="1" style="display: none;">
            <el-form-item label prop="id" :label-width="formLabelWidth">
              <el-input v-model="formInit.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="任务名称:"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '任务名称不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="任务标识:"
              prop="code"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '任务标识不能为空'}]"
            >
              <el-input v-model="formInit.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="任务方法名:"
              prop="className"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '任务方法名不能为空'}]"
            >
              <el-input v-model="formInit.className" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="任务周期:"
              prop="cycle"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '任务周期不能为空'}]"
            >
              <el-input v-model="formInit.cycle" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div style="height: 60px">
          <el-form-item style="float: right;margin-top: 20px">
            <el-button @click="cancel">{{$t('tips.cancel')}}</el-button>
            <el-button type="primary" @click="ensure('form')">{{$t('tips.confirm')}}</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </section>
</template>

<script>
import DetailWin from "./AssignPermissions";
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
          // state:22
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
        name: "",
        className: "",
        roleIds: [],
        code: "",
        cycle: ""
      },
      options: [
        {
          value: "0",
          label: "启用"
        },
        {
          value: "1",
          label: "禁用"
        }
      ],
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
          url: "/manage/quartz/list.htm",
          data: _this.params
        })
        .then(res => {
          _this.list = res.content.data;
          _this.total = res.content.page.total;
          setTimeout(() => {
            _this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(err => {
          _this.listLoading = false;
        });
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
        this.rest();
        let roleArray = row.name.split(",");
        for (let p = 0; p < roleArray.length; p++) {
          roleArray[p] = parseInt(roleArray[p]);
        }
        this.formInit.id = row.id;
        this.formInit.className = row.className;
        this.formInit.name = row.name;
        this.formInit.cycle = row.cycle;
        this.formInit.code = row.code;
        this.dialogFormVisible = true;
      } else if (actionTag == "Lock") {
        let state = row.state == 10 ? this.$t('tips.Disable') : this.$t('tips.Enabled');
        this.$confirm(this.$t('tips.Areyousureto') + state, "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/quartz/enableOrDisable.htm",
                data: { id: row.id, state: row.state }
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
      } else if (actionTag == "Run") {
        this.$confirm("是否立即执行", "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/quartz/runJobNow.htm",
                data: { id: row.id }
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: "执行成功成功!"
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
      if (actionTag == "Add") {
        this.dialogFormVisible = true;
        this.rest();
      }
    },
    rest() {
      this.formInit.id = "";
      this.formInit.name = "";
      this.formInit.className = "";
      this.formInit.roleIds = [];
      this.formInit.code = "";
      this.formInit.cycle = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
                let _this = this;
      _this.formInit.roleIds = _this.formInit.roleIds.toString();

      _this.formLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/quartz/addOrUpdtae.htm",
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
