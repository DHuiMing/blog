<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button :disabled="isDisabled" @click="topAction('Add')" size="small" type="primary">{{$t('tab.Add')}}</el-button>
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
      <el-table-column :label="$t('tab.Number')" prop="code" fixed align="center" width="150px"></el-table-column>
      <el-table-column :label="$t('tab.OptionName')" prop="value" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('tab.CreatTime')" prop="createTime" width="220px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Updateone')" prop="mender" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.OptionType')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ changeStatus(scope.row.codeType)}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.status')" fixed="right" align="center">
        <template slot-scope="scope">
          <span>{{ (scope.row.state==10)?$t('tips.Enabled') : (scope.row.state==20) ? $t('tips.Disabled') : "-"}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>
          <el-button v-if="scope.row.state==10" type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Disable')}}</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enable')}}</el-button>
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
      title=""
      :visible.sync="dialogFormVisible"
      v-if="dialogFormVisible"
      :before-close="handleClose"
      v-loading="formLoading"
    >
      <el-form :model="formInit" style="margin-right: 20px" ref="form">
        <el-row :gutter="20">
          <el-col :span="1" style="display: none;" v-if="isEdit">
            <el-form-item label prop="id" :label-width="formLabelWidth">
              <el-input v-model="formInit.id" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              :label="$t('tab.OptionName')"
              prop="value"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '选项名称不能为空'}]"
            >
              <el-input v-model="formInit.value" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item :label="$t('tab.OptionType')" :label-width="formLabelWidth" v-if="!isEdit">
              <el-select v-model="formInit.codeType" :placeholder="$t('tab.All')">
                <el-option
                  v-for="(item,index) in allList.auditTypeList"
                  :label="item"
                  :key="index"
                  :value="index"
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
      switch (type) {
        case "25":
          result = "人工复审挂起";
          break;
        case "26":
          result = "人工复审通过";
          break;
        default:
          result = "人工复审拒绝";
          break;
      }
      return result;
    }
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
        searchParams: {}
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
    changeStatus(type) {
      if (type == "25") {
        return this.$t('tab.ReviewHangup')
      } else if (type == "26") {
        return this.$t('tab.ReviewPass')
      } else{
        return this.$t('tab.ReviewRefuse')
      }
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
          url: "/manage/risk/orderRefuseCause.htm",
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
        _this.isEdit = true;
        this.topUrl = "/manage/risk/saveOrUpdRefuseCause.htm";
        this.rest();
        this.formInit.id = row.id;
        this.formInit.value = row.value;
        this.formInit.codeType = row.codeType;
        this.dialogFormVisible = true;
      } else if (actionTag == "Lock") {
        let state = row.state == 10 ? this.$t('tips.Disable') : this.$t('tips.Enable');
        this.$confirm(this.$t('tips.Areyousureto') + state, "", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/risk/updateRefuseCauseState.htm",
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
      } else if (item.actionTag == "Run") {
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
