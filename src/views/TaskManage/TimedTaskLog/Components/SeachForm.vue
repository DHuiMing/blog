<template>
  <section class="search-form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini" v-if="isShow">
      <el-form-item :label="$t('tab.OptionType')">
        <el-select style="width: 130px" v-model="formInline.codeType" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in searchList.quartzList"
            :label="item.name"
            :key="index"
            :value="item.id"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.status')">
        <el-select style="width: 130px" v-model="formInline.status" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in searchList.resultList"
            :key="index"
            :label="item"
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
        codeType: "",
        status: ""
      },
      startEndTime: "",
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
          url: "/manage/quartz/quartzLogDropDownList.htm"
        })
        .then(res => {
          _this.searchList = res.content;
          _this.isShow = true;
        })
        .catch(err => {});
    },
    onSubmit() {
      if (this.startEndTime) {
        this.formInline.startTime = this.startEndTime[0];
        this.formInline.endTime = this.startEndTime[1];
      }
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
.el-table__fixed-right {
  z-index: -1;
}
</style>
