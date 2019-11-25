<template>
  <section class="search-form" v-loading="searchLoading">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item label="参数编号">
        <el-input style="width: 130px" v-model="formInline.code"></el-input>
      </el-form-item>
      <el-form-item label="参数名称">
        <el-input style="width: 130px" v-model="formInline.name"></el-input>
      </el-form-item>
      <el-form-item label="参数类型" v-if="isShow">
        <el-select style="width: 130px" v-model="formInline.type" placeholder="参数类型">
          <el-option
            v-for="(item,index) in allList.typeList"
            :label="item.itemValue"
            :key="index"
            :value="item.itemCode"
          >{{item.itemValue}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('table.query')}}</el-button>
        <el-button type="primary" @click="Reset">{{$t('table.reset')}}</el-button>
        <el-button type="primary" @click="RefreshCash">刷新缓存</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "seach-form",
  props: ["allList"],
  data() {
    return {
      isShow: true,
      searchLoading: false,
      formInline: {
        code: "",
        name: "",
        type: "30"
      },
      searchList: {}
    };
  },
  created() {},
  methods: {
    onSubmit() {
      this.$emit("changeParmas", this.formInline);
    },
    Reset() {
      this.formInline = {};
      this.$emit("changeParmas", {});
    },
    RefreshCash() {
      let _this = this;
      _this.searchLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/sysManage/configReload.htm",
          data: null
        })
        .then(res => {
          _this.$message(res.msg);
          setTimeout(() => {
            _this.searchLoading = false;
          }, 0.5 * 1000);
        })
        .catch(err => {
            _this.searchLoading = false;
        });
    }
  }
};
</script>

<style scoped>
.search-form {
  background-color: #fff;
  padding: 16px 10px 0px 10px;
  margin-bottom: 10px;
  border-radius: 6px;
}
</style>