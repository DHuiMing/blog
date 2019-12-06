<template>
  <section class="search-form" v-if="isShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item :label="$t('table.name')">
        <el-input style="width: 130px" v-model="formInline.name" :placeholder="$t('table.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.phone')">
        <el-input style="width: 130px" v-model="formInline.phone" :placeholder="$t('table.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('tab.OrderNumber')">
        <el-input style="width: 130px" v-model="formInline.orderNo" :placeholder="$t('tab.OrderNumber')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('tab.BorrowingTime')">
        <el-date-picker
          v-model="BorrowingTime"
          type="datetimerange"
          :start-placeholder="$t('table.startdate')"
          :end-placeholder="$t('table.enddate')"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('tab.CreatTime')">
        <el-date-picker
          v-model="CreatTime"
          type="datetimerange"
          :start-placeholder="$t('table.startdate')"
          :end-placeholder="$t('table.enddate')"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item>
      <el-form-item :label="$t('table.status')">
        <el-select style="width: 130px" v-model="formInline.isSuccess" :placeholder="$t('tab.All')">
          <el-option
            v-for="(item,index) in allList.flowStatus"
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
  props: ["allList"],
  data() {
    return {
      isShow: false,
      formInline: {
        phone: "",
        name: "",
      },
      searchList: {},
      BorrowingTime: [],
      CreatTime: []
    };
  },
  created() {
    setTimeout(() => {
      this.isShow = true;
    }, 0.5 * 1000);
  },
  methods: {
    onSubmit() {
      if (this.BorrowingTime) {
        this.formInline.borrowStartCreateTime = this.BorrowingTime[0]
        this.formInline.borrowEndCreateTime = this.BorrowingTime[1]
      }
      if (this.CreatTime) {
        this.formInline.kudosStartCreateTime = this.CreatTime[0]
        this.formInline.kudosEndCreateTime  = this.CreatTime[1]
      }
      this.$emit("changeParmas", this.formInline);
    },
    Reset() {
      this.formInline = {};
      this.BorrowingTime = [];
      this.CreatTime = [];
      this.$emit("changeParmas", this.formInline);
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
