<template>
  <section class="search-form" v-if="isShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item :label="$t('table.name')">
        <el-input style="width: 130px" v-model="formInline.borrowName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.phone')">
        <el-input style="width: 130px" v-model="formInline.phone"></el-input>
      </el-form-item>
      <!-- <el-form-item :label="$t('coll.Collectionstatus')">
        <el-select style="width: 130px" v-model="formInline.state" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in searchList.collState"
            :label="item"
            :key="index"
            :value="index"
          >{{item}}</el-option>
        </el-select>
      </el-form-item> -->

      <el-form-item :label="$t('coll.Overduelevel')">
        <el-select style="width: 130px" v-model="formInline.level" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in searchList.overdueLevel"
            :label="item"
            :key="index"
            :value="index"
          >{{item}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('coll.DaysOverdue')">
        <el-input style="width: 130px" v-model="formInline.penaltyDay"></el-input>
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
        borrowName: "",
        phone: "",
        state: "20",
        userId: "",
        level: "",
        isDestribute: "",
        penaltyDay: ""
      },
      searchList: {}
    };
  },
  created() {
    // if (this.$route.params.code) {
    //   let urls = JSON.parse(this.$route.params.code).data;

    //   for (let i = 0; i < urls.length; i++) {
    //     if (urls[i].type == 3) {
    //       this.getSearchList(urls[i].tableUrl);
    //     }
    //   }
    // }
     this.getSearchList();
  },
  methods: {
    getSearchList(url) {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: "/manage/collManage/collDropDownList.htm"
        })
        .then(res => {
          _this.searchList = res.content;
          _this.isShow = true;
        })
        .catch(err => {});
    },
    onSubmit() {
      if (this.formInline.startEndTime) {
        var st = new Date(this.formInline.startEndTime[0]);
        var startTime =
          st.getFullYear() +
          "-" +
          (st.getMonth() + 1) +
          "-" +
          st.getDate() +
          " " +
          st.getHours() +
          ":" +
          st.getMinutes() +
          ":" +
          st.getSeconds();
        var et = new Date(this.formInline.startEndTime[1]);
        var endTime =
          et.getFullYear() +
          "-" +
          (et.getMonth() + 1) +
          "-" +
          et.getDate() +
          " " +
          et.getHours() +
          ":" +
          et.getMinutes() +
          ":" +
          et.getSeconds();
        delete this.formInline.startEndTime;
        this.formInline.startTime = startTime;
        this.formInline.endTime = endTime;
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
</style>
