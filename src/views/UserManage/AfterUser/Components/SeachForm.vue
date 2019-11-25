<template>
  <section class="search-form" v-if="isShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item :label="$t('table.name')">
        <el-input style="width: 130px" v-model="formInline.name" :placeholder="$t('table.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.phone')">
        <el-input style="width: 130px" v-model="formInline.phone" :placeholder="$t('table.phone')"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Aadhaar card">
        <el-input style="width: 130px" v-model="formInline.aadhaarNumber" placeholder="Aadhaar card"></el-input>
      </el-form-item>
      <el-form-item label="PAN card">
        <el-input style="width: 130px" v-model="formInline.PANNumber" placeholder="PAN card"></el-input>
      </el-form-item> -->
      <!-- <el-form-item :label="$t('table.RegistClient')">
        <el-select style="width: 130px" v-model="formInline.registerClient" :placeholder="$t('table.RegistClient')">
          <el-option
            v-for="(item,index) in searchList.clientList"
            :label="item"
            :key="index"
            :value="index"
          >{{item}}</el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item :label="$t('table.RegistrationChannel')">
        <el-select style="width: 130px" v-model="formInline.channelId" :placeholder="$t('table.RegistrationChannel')">
          <el-option
            v-for="(item,index) in searchList.channelList"
            :label="item.name"
            :key="index"
            :value="index"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item :label="$t('table.gender')">
        <el-select style="width: 130px" v-model="formInline.gender" :placeholder="$t('table.gender')">
          <el-option
            v-for="(item,index) in searchList.genderStateList"
            :label="item.text"
            :key="index"
            :value="item.value"
          >{{item.text}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('table.RegistrationTime')">
        <el-date-picker
          v-model="startEndTime"
          type="datetimerange"
          :start-placeholder="$t('table.startdate')"
          :end-placeholder="$t('table.enddate')"
          value-format="yyyy-MM-dd HH:mm:ss"
        ></el-date-picker>
      </el-form-item> -->
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
      isShow: true,
      formInline: {

      },
      startEndTime: "",
      searchList: {}
    };
  },
  created() {
    // if(this.$route.params.code){
    //     let urls = JSON.parse(this.$route.params.code).data
    //     for (let i=0;i<urls.length;i++){
    //         if(urls[i].type==3){
    this.getSearchList("/manage/user/searchList.htm");
    //         }
    //     }
    // }
  },
  methods: {
    getSearchList(url) {
      let _this = this;
      _this
        .$axios({
          method: "post",
          url: url
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
</style>
