<template>
    <div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="80%"
                top="10vh"
                :before-close="handleClose">
            <el-tabs :tab-position="tabPosition" style="height: 70vh;" @tab-click="handleClick" v-if="isShow">
                <el-tab-pane v-for="(item,index) in topList" :key="index" :label="item.tableName" v-if="item.type>1">
                    <strong v-if="item.tableName=='规则详情'"><rule-detail v-if="ruledetail" v-bind:userId="rowList.borrowUserId" v-bind:tableUrl="item.tableUrl"/></strong>
                    <strong v-if="item.tableName=='用户信息'"><user-info v-if="userInfo" v-bind:userId="rowList.borrowUserId" v-bind:tableUrl="item.tableUrl"/></strong>
                    <strong v-if="item.tableName=='通讯录'"><phone-book v-if="phoneBook" v-bind:userId="rowList.borrowUserId"  v-bind:tableUrl="item.tableUrl"/></strong>
                    <strong v-if="item.tableName=='运营商通话'"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.borrowUserId" /></strong>
                    <strong v-if="item.tableName=='信用卡报告'"><credit-cards v-if="creditcards" v-bind:userId="rowList.borrowUserId" /></strong>
                    <strong v-if="item.tableName=='借款信息'"><borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="rowList.borrowUserId" /></strong>
                    <strong v-if="item.tableName=='应用列表'"><application v-if="application" v-bind:userId="rowList.borrowUserId" /></strong>
                    <strong v-if="item.tableName=='催收反馈'"><collection-feedback v-if="collectionfeedback" v-bind:rowList="rowList" /></strong>
                </el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer" style="text-align: left">
                <review-opinion v-if="isReview" :title="title" @refush="refush($event)" :id="rowList.id" :userId="rowList.userId"/>
                <!--<el-button @click="dialogVisible = false">{{$t('tips.cancel')}}</el-button>-->
                <!--<el-button type="primary" @click="dialogVisible = false">{{$t('tips.confirm')}}</el-button>-->
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import RuleDetail from '@/components/TabCompontents/RuleDetail'   //规则详情
    import UserInfo from '@/components/TabCompontents/UserInfo'   //用户信息
    import  PhoneBook from '@/components/TabCompontents/PhoneBook'  //通讯录
    import Carrieroperator from '@/components/TabCompontents/Carrieroperator'  //运营商报告
    import CreditCards from '@/components/TabCompontents/CreditCards'  //信用卡账单
    import BorrowMoneyMsg from '@/components/TabCompontents/BorrowMoneyMsg'  //借款信息
    import Application from '@/components/TabCompontents/Application'  //应用列表
    import ReviewOpinion from '@/components/TabCompontents/ReviewOpinion' //复审意见
    import CollectionFeedback from '@/components/TabCompontents/CollectionFeedback' //催收反馈
    export default {
        name: "detailWin",
        data() {
            return {
                isShow:false,
                title:'详情',
                dialogVisible: false,
                rowList:null,
                tabPosition:'top',
                topList:null,
                ruledetail:false,
                userInfo:true,
                phoneBook:false,
                carrieroperator:false,
                creditcards:false,
                borrowmoneymsg:false,
                application:false,
                isReview:false,//是否是复审
                collectionfeedback:false,
            };
        },
        components: {
            UserInfo,
            PhoneBook,
            Carrieroperator,
            CreditCards,
            BorrowMoneyMsg,
            Application,
            RuleDetail,
            ReviewOpinion,//复审意见
            CollectionFeedback,
        },
        mounted(){


        },
        methods: {
            getUserInfo(code,data,title){
                let _this = this
                _this.title=title
                if(title=='复审'){
                    _this.isReview=true
                }
                _this.topList=JSON.parse(code).data
                _this.dialogVisible=true
                _this.rowList= data
                _this.isShow=true
            },
            handleClose(done) {
                let _this = this;
                this.$confirm(_this.$t('tab.Confirmshutdown'))
                    .then(_ => {
                        _this.$emit('closeWin',true)
                        done();
                    })
                    .catch(_ => {});
            },
            handleClick(tab, event) {
                tab.label=='用户信息'?this.userInfo=true:this.userInfo=false;
                tab.label=='通讯录'?this.phoneBook=true:this.phoneBook=false;
                tab.label=='运营商通话'?this.carrieroperator=true:this.carrieroperator=false;
                tab.label=='信用卡报告'?this.creditcards=true:this.creditcards=false;
                tab.label=='借款信息'?this.borrowmoneymsg=true:this.borrowmoneymsg=false;
                tab.label=='应用列表'?this.application=true:this.application=false;
                tab.label=='催收反馈'?this.collectionfeedback=true:this.collectionfeedback=false;
            },
            refush(){
                this.$emit('refush', true)
            }
        }
    }
</script>

<style scoped>

</style>
