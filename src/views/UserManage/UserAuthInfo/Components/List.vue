<template>
  <section>
    <el-table
      v-loading="listLoading"
      :key="tableKey"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;margin-bottom: 50px"
    >
      <el-table-column :label="$t('table.name')" prop="name" fixed align="center" width="120px"></el-table-column>
      <el-table-column :label="$t('table.phone')" align="center" fixed width="150px">
        <template slot-scope="scope">
          <span>{{ scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Aadhaar card" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.aadhaarCardAuth? $t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="PAN card" width="220px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pANCardAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.BankInfo')"  width="180px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.bankInfoAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Facerecognition')"  width="200px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.faceRecognitionAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.EmegencyContact')"  align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.emegencyContactAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Proofofaddress')" width="150px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.addressProofAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="$t('tab.Thecompanytoprove')" width="150px" align="center">
         <template slot-scope="scope">
          <span>{{ scope.row.companyProofAuth?$t('tab.certified'): $t('tab.unauthorized')}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="$t('table.status')" fixed="right" width="100px" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.state | typeFilter}}</span>
        </template>
      </el-table-column> -->
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
    <detail-win v-if="detailWinShow" ref="deatilwin" v-on:closeWin="closeDetailWin"></detail-win>
  </section>
</template>

<script>
import DetailWin from "./DetailWin";
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
      let result = type == 20 ? "否" : "是";
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
      power: null,
      actionList: null
    };
  },
  computed: {},
  mounted() {},
  created() {
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
          url: "/manage/user/authList.htm",
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
      if (actionTag == "Info") {
        this.detailWinShow = true;
        setTimeout(() => {
          this.$refs.deatilwin.getUserInfo("/manage/loanother/userDetail.htm", row);
        }, 0.5 * 1000);
      } else if (actionTag == "Black") {
        this.open3(row);
      }
    },
    closeDetailWin() {
      this.detailWinShow = false;
    },
    open3(row) {
      let _this = this;
      if (row.state == 20) {
        _this
          .$prompt("请输入拉黑原因", "提示", {
            confirmButtonText: _this.$t('tips.confirm'),
            cancelButtonText: _this.$t('tips.cancel'),
            inputPattern: "",
            inputErrorMessage: ""
          })
          .then(({ value }) => {
            if (!value) {
              _this.$message("拉黑原因不能为空!");
              return;
            }
            _this
              .$axios({
                method: "post",
                url: "/manage/user/updState.htm",
                data: { remarks: value, userId: row.id }
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: "你的拉黑原因是: " + value
                });
              })
              .catch(err => {});
          })
          .catch(() => {
            _this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      } else {
        _this
          .$confirm("是否取消黑名单?", "提示", {
            confirmButtonText: _this.$t('tips.confirm'),
            cancelButtonText: _this.$t('tips.cancel'),
            type: "info"
          })
          .then(() => {
            _this
              .$axios({
                method: "post",
                url: "/manage/user/updState.htm",
                data: { remarks: "取消黑名单", userId: row.id }
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: "取消成功!"
                });
              })
              .catch(err => {});
          })
          .catch(() => {});
      }
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
