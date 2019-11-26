<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
     <el-button  @click="topAction('Add')" size="small" type="primary">{{$t('tab.Add')}}</el-button>
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
      <el-table-column :label="$t('coll.Charactername')" prop="name" fixed align="center" width="200px"></el-table-column>
      <el-table-column :label="$t('coll.RoleID')" prop="nid" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('tab.CreatTime')" prop="addTime" width="220px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.ModifyTime')" prop="updateTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.Modifier')" prop="updateUser" width="150px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.Remarks')" prop="remark" width="300px" align="center"></el-table-column>
      <el-table-column :label="$t('coll.Availability')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.isDelete==0?"否" : "是"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>
          <el-button
            v-if="scope.row.isDelete==0"
            type="primary"
            size="mini"
            @click="handleAction('Lock',scope.row)"
          >{{$t('tips.Disable')}}</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>
          <el-button type="primary" size="mini" @click="handleAction('Allot',scope.row)">{{$t('coll.privilege')}}</el-button>
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
            <el-form-item :label="$t('coll.Charactername')" prop="id" :label-width="formLabelWidth">
              <el-input v-model="formInit.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('coll.Charactername')"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '角色名称不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('coll.RoleID')"
              prop="nid"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '角色唯一标示不能为空'}]"
            >
              <el-input v-model="formInit.nid" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item :label="$t('coll.Remarks')" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="formInit.remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('table.status')"
              prop="isDelete"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '不能为空'}]"
            >
              <el-select v-model="formInit.isDelete" :placeholder="$t('table.status')">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :value="item.value"
                  :label="item.label"
                ></el-option>
              </el-select>
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
        name: "",
        nid: "",
        remark: "",
        isDelete: ""
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
          url: "/manage/sysManage/roleList.htm",
          method: "post",
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
        this.topUrl = "/manage/sysManage/roleSaveOrUpdate.htm";
        this.rest();
        this.dialogFormVisible = true;
        this.formInit.id = row.id;
        this.formInit.isDelete = row.isDelete == 1 ? this.$t('tips.Disable') : this.$t('tips.Enabled');
        this.formInit.name = row.name;
        this.formInit.nid = row.nid;
        this.formInit.remark = row.remark;
      } else if (actionTag == "Lock") {
        let state = row.isDelete == 0 ? this.$t('tips.Disabled') : this.$t('tips.Enabled');
        this.$confirm(this.$t('tips.Areyousureto') + state, "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this.$axios({
                url: "/manage/sysManage/roleChangeState.htm",
                method: "post",
                data: { roleId: row.id, state: row.isDelete == 0 ? 1 : 0 }
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
      } else if (actionTag == "Allot") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo(
            "/manage/sysManage/findRoleMenuHas.htm",
            row,
            "分配权限"
          );
        }, 0.5 * 1000);
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
      this.topUrl = '/manage/sysManage/roleSaveOrUpdate.htm';
      if (actionTag == "Add") {
        this.dialogFormVisible = true;
        this.rest();
      }
    },
    rest() {
      this.formInit.id = "";
      this.formInit.isDelete = "";
      this.formInit.name = "";
      this.formInit.nid = "";
      this.formInit.remark = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.formInit.isDelete == "启用") {
            this.formInit.isDelete = 0;
          } else if (this.formInit.isDelete == "禁用") {
            this.formInit.isDelete = 1;
          }
          let _this = this;
          _this.formLoading = true;
          _this
            .$axios({
              url: _this.topUrl,
              method: "post",
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
