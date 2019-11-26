<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button  @click="topAction('Add')" size="small" type="primary">{{$t('tab.Add')}}</el-button>
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
      <el-table-column :label="$t('tab.Number')" prop="id"  align="center" ></el-table-column>
      <el-table-column :label="$t('tab.ContaceWord')" align="center" prop="name"  ></el-table-column>
      <el-table-column :label="$t('tab.ContactType')" prop="type"   align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.type==1 ? $t('tab.kinsfolk'):$t('tab.specialtelephoneline')}}</span>
        </template>
      </el-table-column>

      <!-- <el-table-column :label="$t('tab.Penaltycharge')" prop="penaltyCharge" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidAmout')" prop="repaidAmout" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.ReceiptTime')" prop="receiptTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.Repaymentdate')" prop="repaymentDate" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.RepaidTime')" prop="repaidTime" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.DaysOverdue')" prop="daysOverdue" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('tab.UserGroup')" prop="userGroup" width="180px" align="center">
          <template slot-scope="scope">
          <span>{{ scope.row.userGroup ? '老客':'新客'}}</span>
        </template>
      </el-table-column>-->

      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Edit',scope.row)">{{$t('table.edit')}}</el-button>
          <!-- <el-button v-if="scope.row.state==10" type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Disable')}}</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Lock',scope.row)">{{$t('tips.Enabled')}}</el-button>  -->
        </template>
      </el-table-column>
    </el-table>

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
              :label="$t('tab.ContaceWord')"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '通讯录字典名称不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
              <el-col :span="11">
            <el-form-item :label="$t('tab.ContactType')" :label-width="formLabelWidth">
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
            <el-button @click="cancel">{{$t('tips.cancel')}}</el-button>
            <el-button type="primary" @click="ensure('form')">{{$t('tips.confirm')}}</el-button>
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
        "10": this.$t('tab.Apply'),
        "20": this.$t('tab.AutoReviewPass'),
        "21": this.$t('tab.AutoReviewRefuse'),
        "22": this.$t('tab.Reviewing'),
        "25": this.$t('tab.ReviewHangup'),
        "26": this.$t('tab.ReviewPass'),
        "27": this.$t('tab.ReviewRefuse'),
        "30": this.$t('tab.LoanSuccess'),
        "31": this.$t('tab.LoanFail'),
        "40": this.$t('tab.Repayed'),
        "41": this.$t('tab.RepayedReduced'),
        "45": this.$t('tab.Repaying'),
        "50": this.$t('tab.Overdue'),
        "90": this.$t('tab.BadDebt')
      },
      auditTypeList:{
        1:this.$t('tab.kinsfolk'),
        2:this.$t('tab.specialtelephoneline')
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
