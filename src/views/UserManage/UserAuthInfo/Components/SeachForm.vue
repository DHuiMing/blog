<template>
  <section class="search-form" v-if="isShow">
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
      <el-form-item :label="$t('table.name')">
        <el-input style="width: 130px" v-model="formInline.name" :placeholder="$t('table.name')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('table.phone')">
        <el-input style="width: 130px" v-model="formInline.phone" :placeholder="$t('table.phone')"></el-input>
      </el-form-item>
      <el-form-item label="aadhaar card">
        <el-select style="width: 130px" v-model="formInline.aadhaarCardAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="PAN card">
        <el-select style="width: 130px" v-model="formInline.PANCardAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.Statebank')">
        <el-select style="width: 130px" v-model="formInline.bankInfoAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.EmegencyContact')">
        <el-select style="width: 130px" v-model="formInline.emegencyContactAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.Facerecognition')">
        <el-select style="width: 130px" v-model="formInline.faceRecognitionAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.Proofofaddress')">
        <el-select style="width: 130px" v-model="formInline.addressProofAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.Thecompanytoprove')">
        <el-select style="width: 130px" v-model="formInline.companyProofAuth" placeholder="">
          <el-option
            v-for="(item,index) in state"
            :label="item.name"
            :key="index"
            :value="item.value"
          >{{item.name}}</el-option>
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
      isShow: true,
      formInline: {
        name: "",
        phone:'',
        bankInfoAuth:'',
        emegencyContactAuth:'',
        aadhaarCardAuth:'',
        PANCardAuth:''

      },
      state:[
        {
          name: this.$t('tab.certified'),
          value:1
        },{
          name: this.$t('tab.unauthorized'),
          value:0
        }
      ],
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
     console.log(this.formInline)
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
