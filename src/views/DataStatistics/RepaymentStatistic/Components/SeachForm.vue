<template>
  <section class="search-form">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
    <el-form-item label="日期">
        <el-date-picker
          v-model="startEndTime"
          type="datetimerange"
          :start-placeholder="$t('table.startdate')"
          :end-placeholder="$t('table.enddate')"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
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
      formInline: {
       
      },
      startEndTime:'',
    };
  },
  created() {
    
  },
  methods: {
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
</style>