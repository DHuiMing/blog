<template>
  <div class="details">
    <el-dialog
      :tabTitle="tabTitle"
      :visible.sync="dialogVisible"
      width="80%"
      top="1vh"
      :before-close="handleClose"
    >
      <el-tabs :tab-position="tabPosition" @tab-click="handleClick" v-if="isShow" v-model="activeName">
        <!-- <el-tab-pane v-for="(item,index) in topList" :key="index" :label="item.tableName">
                    <strong v-if="item.tableName=='用户信息'"><user-info v-if="userInfo" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='通讯录'"><phone-book v-if="phoneBook" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='运营商通话'"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='信用卡报告'"><credit-cards v-if="creditcards" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='借款信息'"><borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='应用列表'"><application v-if="application" v-bind:userId="rowList.id" /></strong>
        </el-tab-pane>-->
        <el-tab-pane :label="$t('tab.UserInfo')" name="UserInfo">
          <user-info v-if="userInfo" v-bind:userId="userId"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.addresslist')" name="addresslist">
          <phone-book v-if="phoneBook" v-bind:userId="userId"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.telephonerecord')" name="telephonerecord">
          <div class="nodate">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.Textdata')" name="Textdata">
          <message-record v-if="messagerecord" v-bind:userId="userId"></message-record>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.applicationlist')" name="applicationlist">
          <application v-if="application" v-bind:userId="userId"/>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.Thirdpartydata')" name="Thirdpartydata">
          <div class="nodate">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane :label="$t('tab.Referencedata')" name="Referencedata">
          <div class="nodate">暂无数据</div>
        </el-tab-pane>
        <!-- <el-tab-pane label="运营商通话"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.userId" /></el-tab-pane> -->
        <!-- <el-tab-pane label="信用卡报告"><credit-cards v-if="creditcards" v-bind:userId="rowList.userId" /></el-tab-pane> -->
        <el-tab-pane :label="$t('tab.borrowinginformation')" name="borrowinginformation">
          <borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="userId"/>
        </el-tab-pane>
        <el-tab-pane label="bettec credit">
          <div class="nodate">敬请期待</div>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer" style="text-align: left">
        <review-opinion
          v-if="isReview"
          :title="title"
          @refush="refush($event)"
          :id="borrowId"
          :userId="userId"
        />
        <!--<el-button @click="dialogVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="dialogVisible = false">确 定</el-button>-->
        <section style="background-color: #f5f5f5;padding: 6px;border-radius: 4px;" v-if="isRefuse">
          <el-form ref="form" label-width="80px" style="width: 660px;" label-position="left">
            <el-form-item label="审批意见">
              <el-input type="text" disabled v-model="stateStr"></el-input>
            </el-form-item>

            <el-form-item label="拒绝原因">
              <el-input type="text" disabled v-model="orderView"></el-input>
            </el-form-item>

            <el-form-item label="备注说明">
              <el-input type="textarea" disabled :rows="6" v-model="remark"></el-input>
            </el-form-item>
          </el-form>
        </section>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import UserInfo from "@/components/TabCompontents/UserInfo";
import PhoneBook from "@/components/TabCompontents/PhoneBook";
import Carrieroperator from "@/components/TabCompontents/Carrieroperator";
import CreditCards from "@/components/TabCompontents/CreditCards";
import BorrowMoneyMsg from "@/components/TabCompontents/BorrowMoneyMsg";
import Application from "@/components/TabCompontents/Application";
import MessageRecord from "@/components/TabCompontents/MessageRecord";
import ReviewOpinion from "@/components/TabCompontents/ReviewOpinion"; //复审意见
export default {
  name: "detailWin",
  data() {
    return {
      tabTitle: "用户详情",
      dialogVisible: false,
      tabPosition: "top",
      topList: null,
      userInfo: true,
      phoneBook: false,
      carrieroperator: false,
      creditcards: false,
      borrowmoneymsg: false,
      application: false,
      isShow: false,
      messagerecord: false,
      userId: "",
      borrowId: "",
      isReview: false, //是否是复审
      isRefuse: false, //是否是决绝订单
      title: "详情",
      stateStr: "",
      orderView: "",
      remark: "",
      activeName:'UserInfo'
    };
  },
  components: {
    UserInfo,
    PhoneBook,
    Carrieroperator,
    CreditCards,
    BorrowMoneyMsg,
    Application,
    MessageRecord,
    ReviewOpinion //复审意见
  },
  mounted() {
    // this.userId = this.$route.query.userId;
    // this.borrowId = this.$route.query.borrowId;
    // if(this.$route.query.title == '复审'){
    //     this.title = '复审'
    //     this.isReview=true
    // }
    // this.getUserInfo();
  },
  methods: {
    getUserInfo(row, type) {
      let _this = this;
      // _this.topList=JSON.parse(code).data
      if(type=='collecting'){
          this.userId=row.borrowUserId
      }else{
        this.userId = row.userId?row.userId:row.borrowUserId;
        this.borrowId = row.borrowId;
      }
      if (type == "复审") {
        this.title = "复审";
        this.isReview = true;
      }
      _this.dialogVisible = true;

      _this.isShow = true;
    },
    handleClose(done) {
      let _this = this;
      this.$confirm(_this.$t('tab.Confirmshutdown'))
        .then(_ => {
          _this.$emit("closeWin", true);
          done();
        })
        .catch(_ => {});
    },
    handleClick(tab, event) {
      console.log(tab)
      tab.name == "addresslist"
        ? (this.phoneBook = true)
        : (this.phoneBook = false);
      tab.name == "Textdata"
        ? (this.messagerecord = true)
        : (this.messagerecord = false);
      tab.name == "运营商通话"
        ? (this.carrieroperator = true)
        : (this.carrieroperator = false);
      tab.name == "信用卡报告"
        ? (this.creditcards = true)
        : (this.creditcards = false);
      tab.name == "borrowinginformation"
        ? (this.borrowmoneymsg = true)
        : (this.borrowmoneymsg = false);
      tab.name == "applicationlist"
        ? (this.application = true)
        : (this.application = false);
    },
    refush() {
      this.$emit("refush", true);
    }
  }
};
</script>

<style scoped>
.details {
  background-color: #fff;
  padding: 20px;
}
.nodate {
  font-size: 50px;
  text-align: center;
  line-height: 500px;
}
</style>
