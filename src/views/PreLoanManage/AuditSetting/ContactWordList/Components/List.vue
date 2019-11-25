<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button  @click="topAction('Add')" size="small" type="primary">新增</el-button>
    </div>
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
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 50px;"
    >
      <el-table-column label="序号" prop="id"  align="center" ></el-table-column>
      <el-table-column label="通讯录字典名称" align="center" prop="name"  ></el-table-column>
      <el-table-column label="通讯录类型" prop="type"   align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.type==1 ? '亲属':'专线'}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column label="逾期费用" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column label="已还金额" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <el-table-column label="到账时间" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column label="应还日期" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column label="实际还款时间" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>
      <el-table-column label="客群" prop="userGroup" width="180px" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? '老客':'新客'}}</span>
        </template>
      </el-table-column>-->

      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">编辑</el-button>
          <!-- <el-button v-if="scope.row.state==10" type="primary" size="mini" @click="handleAction('Lock',scope.row)">禁用</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">启用</el-button>  -->
        </template>
      </el-table-column>
    </el-table>

     <el-dialog
      title="新增"
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
              label="通讯录字典名称:"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '通讯录字典名称不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
              <el-col :span="11">
            <el-form-item label="通讯录类型" :label-width="formLabelWidth">
              <el-select v-model="formInit.type" :placeholder="$t('tab.All')">
                <el-option
                  v-for="(item,index) in auditTypeList"
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
            <el-button @click="cancel">取 消</el-button>
            <el-button type="primary" @click="ensure('form')">确 定</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
    <!-- <detail-win v-if="detailWinShow" ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win> -->
  </section>
</template>
<script>
// import DetailWin from "./DetailWin";
export default {
  name: "list",
  components: {
    // DetailWin
  },
  filters: {},
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
      formInit: {
        id:'',
        name:'',
        type:'',
      },
      contractUrl: "",
      famline: {},
      formLoading: false,
      currentPage: 1,
      formLabelWidth:'120',
      dialogFormVisible: false,
      detailWinShow: false,
      power: null,
      actionList: null,
      allBorrowState: {
        "10": "申请成功待审核",
        "20": "自动审核通过",
        "21": "自动审核不通过",
        "22": "自动审核未决待人工复审",
        "25": "人工复审挂起",
        "26": "人工复审通过",
        "27": "人工复审不通过",
        "30": "放款成功",
        "31": "放款失败",
        "40": "还款成功",
        "41": "还款成功-金额减免",
        "45": "还款中",
        "50": "逾期",
        "90": "坏账"
      },
      auditTypeList:{
        1:'亲属',
        2:'专线'
      }
    };
  },
  computed: {},
  mounted() {},
  created() {
    this.params.searchParams = JSON.stringify(this.params.searchParams);
    this.getList();
    this.actionList = this.getActionList(this.$route.params);
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
          url: "/manage/risk/listContactDict.htm",
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
        this.topUrl = "/manage/risk/saveOrUpdContactDict.htm";
        this.rest();
        this.formInit.id = row.id;
        this.formInit.name = row.name;
        this.formInit.type = row.type.toString();
        this.dialogFormVisible = true;
      } else if (actionTag == "Lock") {
        let state = row.state == 10 ? "禁用" : "启用";
        this.$confirm("是否确定" + state, "提示", {
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
      this.topUrl = "/manage/risk/saveOrUpdContactDict.htm";
      if (actionTag == "Add") {
        this.isEdit = false;
        this.dialogFormVisible = true;
        this.rest();
      }
    },
        rest() {
      this.formInit.id = "";
      this.formInit.name = "";
      this.formInit.type = "";
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
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    closeDetailWin() {
      this.detailWinShow = false;
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
.el-dialog__body {
  /*height: 80vh!important;*/
}
</style>
