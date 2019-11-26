<template>
  <div>
    <el-dialog
      title="接口详情"
      :visible.sync="dialogFormVisible"
      :before-close="handleClose"
      width="1000px"
    >
      <div style="margin: 4px 0;background-color: #fff;padding: 4px">
        <el-button @click="topAction()" size="small" type="primary">{{$t('tab.Add')}}</el-button>
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
        <el-table-column label="父节点" prop="parentId" fixed align="center" width="200px"></el-table-column>
        <el-table-column
          label="名称"
          :show-overflow-tooltip="true"
          winth="200px"
          prop="itemValue"
          align="center"
        ></el-table-column>
        <el-table-column label="代码" prop="itemCode" width="220px" align="center"></el-table-column>
        <el-table-column :label="$t('table.Operating')" fixed="right" width="300px" align="center">
          <template slot-scope="scope">
            <span>
              <el-button type="primary" size="mini" @click="handleAction(scope.row)">{{$t('table.edit')}}</el-button>
            </span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog :title="title" :visible.sync="addEditVisible" append-to-body>
        <el-form :model="formInit" ref="form2" v-loading="formLoading">
          <el-form-item label="id" :label-width="formLabelWidth" style="display: none">
            <el-input v-model="formInit.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="父节点"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '父节点不能为空'}]"
          >
            <el-input v-model="formInit.parentId" autocomplete="off" :disabled="isDisabled"></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('tab.ContaceWord')"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '字典名称不能为空'}]"
          >
            <el-input v-model="formInit.itemValue" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item
            label="字典代码"
            :label-width="formLabelWidth"
            :rules="[{ required: true, message: '字典代码不能为空'}]"
          >
            <el-input v-model="formInit.itemCode" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addEditVisible = false">{{$t('tips.cancel')}}</el-button>
          <el-button type="primary" @click="ensure('form2')">{{$t('tips.confirm')}}</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "detailWin",
  data() {
    return {
      tableKey: 0,
      dialogFormVisible: true,
      addEditVisible: false,
      list: null,
      total: 0,
      listLoading: false,
      formLoading: false,
      params: {
        current: 1,
        pageSize: 10,
        searchParams: {
          state: 22
        }
      },
      currentPage: 1,
      formLabelWidth: "120px",
      formInit: {
        id: "",
        parentId: "",
        itemValue: "",
        itemCode: ""
      },
      title: "新增",
      row: null,
      item: null,
      isDisabled: true
    };
  },
  components: {},
  mounted() {},
  methods: {
    getList(row, code) {
      let _this = this;
      _this.row = row;
      _this.formInit.parentId = row.id;
      _this.listLoading = true;
      _this
        .$axios({
          url: code,
          method: "post",
          data: { id: row.id, current: 1, pageSize: 100 }
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
    handleClose() {
      this.$emit("closeWin", true);
    },
    handleAction(row) {
      this.rest();
      this.formInit.id = row.id;
      this.formInit.itemValue = row.itemValue;
      this.formInit.itemCode = row.itemCode;
      this.addEditVisible = true;
      this.title = "编辑";
    },
    topAction() {
      this.rest();
      this.addEditVisible = true;
      this.title = "新增";
    },
    rest() {
      this.formInit.id = "";
      this.formInit.itemValue = "";
      this.formInit.itemCode = "";
    },
    ensure(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let _this = this;
          _this.formLoading = true;
          _this
            .$axios({
              url: "/manage/sysManage/dictDetailSaveOrUpdate.htm",
              method: "post",
              data: _this.formInit
            })
            .then(res => {
              _this.formLoading = false;
              _this.getList(_this.row, _this.item);
              _this.addEditVisible = false;
            })
            .catch(err => {});
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
</style>
