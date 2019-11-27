<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button :disabled="isDisabled" @click="topAction()" size="small" type="primary">{{$t('tab.Add')}}</el-button>
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
      <el-table-column
        :label="$t('coll.Parameternumber')"
        :show-overflow-tooltip="true"
        prop="code"
        fixed
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column
        :label="$t('coll.ParameterName')"
        :show-overflow-tooltip="true"
        prop="name"
        fixed
        align="center"
        width="250px"
      ></el-table-column>
      <el-table-column
        :label="$t('coll.parametervalues')"
        :show-overflow-tooltip="true"
        prop="value"
        width="220px"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('coll.parametertype')"
        :show-overflow-tooltip="true"
        prop="typeStr"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column
        :label="$t('coll.Remarks')"
        :show-overflow-tooltip="true"
        prop="remark"
        width="180px"
        align="center"
      ></el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.status == 1 ? $t('tips.Enabled') : scope.row.status == 0 ? $t('tips.Disable') : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">

            <el-button v-if="scope.row.status != 1" type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>
             <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Disable')}}</el-button>

            <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('tem.modification')}}</el-button>

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
          <el-col :span="1" style="display: none;">
            <el-form-item label prop="id" :label-width="formLabelWidth">
              <el-input v-model="formInit.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('coll.Parameternumber')"
              prop="code"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '工号不能为空'}]"
            >
              <el-input v-model="formInit.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('coll.ParameterName')"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '真实姓名不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('coll.parametervalues')"
              prop="value"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '姓名不能为空'}]"
            >
              <el-input v-model="formInit.value" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              :label="$t('coll.parametertype')"
              prop="type"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '不能为空'}]"
            >
              <el-select style="width: 130px" v-model="formInit.type" placeholder="参数类型">
                <el-option
                  v-for="(item,index) in allList.typeList"
                  :label="item.itemValue"
                  :key="index"
                  :value="item.itemCode"
                >{{item.itemValue}}</el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item :label="$t('coll.Remarks')" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="formInit.remark" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12"></el-col>
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
export default {
  name: "list",
  components: {},
  filters: {
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
          type: 30
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
        value: "",
        type: "",
        remark: ""
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
      formLoading: false
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
      this.getList(this.params);
    },
    getList(params) {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/sysManage/configList.htm",
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
        this.rest();
        this.formInit.id = row.id;
        this.formInit.code = row.code;
        this.formInit.name = row.name;
        this.formInit.value = row.value;
        this.formInit.type = row.type.toString();
        this.formInit.remark = row.remark;
        this.dialogFormVisible = true;
      } else if (actionTag == "Lock") {
        let state = row.status == 1 ? this.$t('tips.Disable') : this.$t('tips.Enabled');
        this.$confirm(this.$t('tips.Areyousureto') + state, "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                url: '/manage/sysManage/configUpdateState.htm',
                method: "post",
                data: { id: row.id, status: row.status == 0 ? 1 : 0 }
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
    topAction(item) {
      this.dialogFormVisible = true;
      this.rest();
    },
    rest() {
      this.formInit.id = "";
      this.formInit.code = "";
      this.formInit.name = "";
      this.formInit.value = "";
      this.formInit.type = "";
      this.formInit.remark = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        } else {
          return false;
        }
      });

      let _this = this;
      _this.formLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/sysManage/configSaveOrUpdate.htm",
          data: _this.formInit
        })
        .then(res => {
          _this.formLoading = false;
          _this.getList();
          _this.dialogFormVisible = false;
        })
        .catch(err => {});
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
