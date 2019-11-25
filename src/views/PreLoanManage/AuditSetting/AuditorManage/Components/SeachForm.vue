<template>
  <section class="search-form" v-if="isShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item :label="$t('table.name')">
        <el-input style="width: 130px" v-model="formInline.userName" :placeholder="$t('table.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.status')">
        <el-select style="width: 130px" v-model="formInline.status" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in searchList.stateList"
            :label="item"
            :key="index"
            :value="index"
          >{{item}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('table.query')}}</el-button>
        <el-button type="primary" @click="Reset">{{$t('table.reset')}}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "seach-form",
  data() {
    return {
      isShow: false,
      formInline: {
        userName: "",
        status: ""
      },
      searchList: {}
    };
  },
  created() {
      this.getSearchList();
    // if (this.$route.params.code) {
    //   let urls = JSON.parse(this.$route.params.code).data;

    //   for (let i = 0; i < urls.length; i++) {
    //     if (urls[i].type == 3) {
    //       this.getSearchList(urls[i].tableUrl);
    //     }
    //   }
    // }
  },
  methods: {
    getSearchList(url) {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/manage/risk/userExamineDropDownList.htm"
        })
        .then(res => {
          _this.searchList = res.content;
          _this.isShow = true;
        })
        .catch(err => {});
    },
    onSubmit() {
      this.$emit("changeParmas", this.formInline);
    },
    Reset() {
      this.formInline = {};
      this.$emit("changeParmas", {});
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
