<template>
  <section>
    <div style="margin: 4px 0;background-color: #fff;padding: 4px">
      <el-button
        :disabled="isDisabled"
        v-for="item in actionPlBtn"
        :key="item.value"
        @click="topAction(item)"
        size="small"
        type="primary"
      >{{item.label}}</el-button>
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
      <el-table-column label="字典类型" prop="name" fixed align="center" width="200px"></el-table-column>
      <el-table-column label="类型代码" prop="code" align="center"></el-table-column>
      <el-table-column label="备注" prop="remark" width="220px" align="center"></el-table-column>
      <el-table-column label="排序" prop="sort" width="180px" align="center"></el-table-column>
      <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleAction('Detail',scope.row)">详情</el-button>
          <el-button
            v-if="scope.row.status==0"
            type="primary"
            size="mini"
            @click="handleAction('Edit',scope.row)"
          >修改</el-button>
          <el-button v-else type="primary" size="mini" @click="handleAction('Delete',scope.row)">删除</el-button>
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
              label="字典类型:"
              prop="name"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '字典类型不能为空'}]"
            >
              <el-input v-model="formInit.name" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="类型代码:"
              prop="code"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '类型代码不能为空'}]"
            >
              <el-input v-model="formInit.code" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item
              label="排序:"
              prop="sort"
              :label-width="formLabelWidth"
              :rules="[{ required: true, message: '排序不能为空'}]"
            >
              <el-input v-model="formInit.sort" autocomplete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="备注:" prop="remark" :label-width="formLabelWidth">
              <el-input v-model="formInit.remark" autocomplete="off"></el-input>
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
import DetailWin from "./DetailWin";
export default {
  name: "list",
  components: {
    DetailWin
  },
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
          // state: 22
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
        sort: "",
        code: "",
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
          url: "/manage/sysManage/dictList.htm",
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
        this.topUrl = "/manage/sysManage/dictSaveOrUpdate.htm";
        this.rest();
        let roleArray = row.name.split(",");
        for (let p = 0; p < roleArray.length; p++) {
          roleArray[p] = parseInt(roleArray[p]);
        }
        this.formInit.id = row.id;
        this.formInit.sort = row.sort;
        this.formInit.name = row.name;
        this.formInit.remark = row.remark;
        this.formInit.code = row.code;
        this.dialogFormVisible = true;
      } else if (actionTag == "Detail") {
        this.detailWinShow = true;
        setTimeout(() => {
          _this.$refs.deatilwin.getList(
            row,
            "/manage/sysManage/dictDetailFind.htm"
          );
        }, 0.2 * 1000);
      } else if (actionTag == "Delete") {
        this.$confirm("是否删除", "提示", {
          confirmButtonText: _this.$t('tips.confirm'),
          cancelButtonText: _this.$t('tips.cancel'),
          type: "warning"
        })
          .then(() => {
            _this
              .$axios({
                url: "/manage/sysManage/dictDetailDelete.htm",
                method: "post",
                data: { id: row.id }
              })
              .then(res => {
                _this.getList();
                _this.$message({
                  type: "success",
                  message: "删除成功!"
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
      this.topUrl = "/manage/sysManage/dictDetailSaveOrUpdate.htm";
      if (actionTag == "Add") {
        this.dialogFormVisible = true;
        this.rest();
      }
    },
    rest() {
      this.formInit.id = "";
      this.formInit.sort = "";
      this.formInit.name = "";
      this.formInit.remark = "";
      this.formInit.code = "";
    },
    cancel() {
      this.dialogFormVisible = false;
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
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