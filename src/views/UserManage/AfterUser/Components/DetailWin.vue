<template>
    <div>
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                width="80%"
                top="10vh"
                :before-close="handleClose">
            <el-tabs :tab-position="tabPosition" style="height: 70vh;" @tab-click="handleClick" v-if="isShow">
                <!-- <el-tab-pane v-for="(item,index) in topList" :key="index" :label="item.tableName">
                    <strong v-if="item.tableName=='用户信息'"><user-info v-if="userInfo" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='通讯录'"><phone-book v-if="phoneBook" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='运营商通话'"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='信用卡报告'"><credit-cards v-if="creditcards" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='借款信息'"><borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='应用列表'"><application v-if="application" v-bind:userId="rowList.id" /></strong>
                </el-tab-pane> -->
                    <el-tab-pane label="用户信息"><user-info v-if="userInfo" v-bind:userId="rowList.userId" /></el-tab-pane>
                     <el-tab-pane label="通讯录"><phone-book v-if="phoneBook" v-bind:userId="rowList.userId" /></el-tab-pane>
                     <el-tab-pane label="通话记录"> <div class='nodate'>{{$t('tem.nodata')}}</div> </el-tab-pane>
                     <el-tab-pane label="短信数据"><message-record v-if="messagerecord" v-bind:userId="rowList.userId"></message-record> </el-tab-pane>
                     <el-tab-pane label="应用列表"> <application v-if="application" v-bind:userId="rowList.userId" /></el-tab-pane>
                     <el-tab-pane label="第三方数据"><div class='nodate'>{{$t('tem.nodata')}}</div></el-tab-pane>
                     <el-tab-pane label="征信记录"><div class='nodate'>{{$t('tem.nodata')}}</div></el-tab-pane>
                     <!-- <el-tab-pane label="运营商通话"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.userId" /></el-tab-pane> -->
                     <!-- <el-tab-pane label="信用卡报告"><credit-cards v-if="creditcards" v-bind:userId="rowList.userId" /></el-tab-pane> -->
                     <el-tab-pane label="借款信息"><borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="rowList.userId" /></el-tab-pane>
                     <el-tab-pane label="bettec credit"><div class='nodate'>{{$t('tem.comingsoon')}}</div></el-tab-pane>

            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import UserInfo from '@/components/TabCompontents/UserInfo'
    import  PhoneBook from '@/components/TabCompontents/PhoneBook'
    import Carrieroperator from '@/components/TabCompontents/Carrieroperator'
    import CreditCards from '@/components/TabCompontents/CreditCards'
    import BorrowMoneyMsg from '@/components/TabCompontents/BorrowMoneyMsg'
    import Application from '@/components/TabCompontents/Application'
    import MessageRecord from '@/components/TabCompontents/MessageRecord'
    export default {
        name: "detailWin",
        data() {
            return {
                dialogVisible: false,
                rowList:null,
                tabPosition:'top',
                topList:null,
                userInfo:true,
                phoneBook:false,
                carrieroperator:false,
                creditcards:false,
                borrowmoneymsg:false,
                application:false,
                isShow:false,
                messagerecord:false,
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
        },
        mounted(){


        },
        methods: {
            getUserInfo(code,data){
                let _this = this
                // _this.topList=JSON.parse(code).data
                _this.dialogVisible=true
                _this.rowList= data
                _this.isShow = true


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

                tab.label=='通讯录'?this.phoneBook=true:this.phoneBook=false;
                tab.label=='短信数据'?this.messagerecord=true:this.messagerecord=false;
                tab.label=='运营商通话'?this.carrieroperator=true:this.carrieroperator=false;
                tab.label=='信用卡报告'?this.creditcards=true:this.creditcards=false;
                tab.label=='借款信息'?this.borrowmoneymsg=true:this.borrowmoneymsg=false;
                tab.label=='应用列表'?this.application=true:this.application=false;
            }
        }
    }
</script>

<style scoped>
.nodate{
    font-size: 50px;
    text-align: center;
    line-height: 500px;
}
</style>
