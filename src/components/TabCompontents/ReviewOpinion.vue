//复审
<template>
  <section
    style="background-color: #f5f5f5;padding: 6px;border-radius: 4px;"
    v-loading="listLoading"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      style="width: 660px;"
      label-position="left"
      v-if="isShow"
    >
      <el-form-item :label="$t('tab.approvalopinion')">
        <el-select v-model="form.state" :placeholder="$t('tab.approvalopinion')" @change="checkOpinion">
          <el-option
            v-for="(item,index) in list.allExamineTypeList"
            :key="index"
            :label="item"
            :value="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('tab.Refusetoreason')" v-show="refuse">
        <el-checkbox-group v-model="form.orderView">
          <el-checkbox
            v-for="(item,index) in list.allExamineList"
            :label="item.value"
            :key="index"
            :value="item.id"
            name="type"
            @change="checkbokChange(index)"
          ></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item :label="$t('tab.descr')">
        <el-input type="textarea" v-model="form.remark"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">{{$t('tips.confirm')}}</el-button>
        <!--<el-button>取消</el-button>-->
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
export default {
  name: "review-opinion",
  data() {
    return {
      isShow: false,
      form: {
        state: "",
        orderView: [],
        remark: "",
        BorrowId: this.id,
        userId:this.userId
      },
      list: "",
      listLoading: false,
      refuse: false,
      ind: []
    };
  },
  props: ["id", "userId"],
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let _this = this;
      _this.listLoading = true;
      _this
        .$axios({
          method: "get",
          url: "manage/loanother/info.htm?infoType=20&BorrowId=" + _this.id
        })
        .then(res => {
          _this.list = res.content;
          setTimeout(() => {
            _this.listLoading = false;
            _this.isShow = true;
          }, 0.5 * 1000);
        })
        .catch(err => {});
    },
    onSubmit() {
      let _this = this;
      console.log(this.ind);
      let indexs = _this.ind,
        views = [];
      for (let i in indexs) {
        views.push(_this.list.allExamineList[indexs[i]]);
        // console.log(_this.list.allExamineList[i])
      }
      console.log(JSON.stringify(views));
      _this.form.orderView = JSON.stringify(views);
      _this.listLoading = true;
      _this
        .$axios({
          method: "post",
          url: "/manage/loanother/verifyBorrow.htm",
          data: _this.form
        })
        .then(res => {
          setTimeout(() => {
            _this.$emit("refush", true);
            _this.listLoading = false;
          }, 0.5 * 1000);
        })
        .catch(err => {});
    },
    checkbokChange(ind) {
      let indexs = this.ind;
      for (let i = 0; i < indexs.length; i++) {
        if (indexs[i] == ind) {
          delete indexs[i];
          return;
        }
      }
      this.ind.push(ind);
      console.log(this.ind);
    },
    checkOpinion(v) {
      v == 27 ? (this.refuse = true) : (this.refuse = false);
    }
  }
};
</script>

<style scoped>
</style>
<!--manage/loanother/info.htm-->
<!--?infoType=20&borrowMainId=9337-->
