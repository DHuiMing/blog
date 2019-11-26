<template>
    <div>
        <el-dialog
                title="详情"
                :visible.sync="dialogVisible"
                width="80%"
                top="10vh"
                :before-close="handleClose">
            <el-tabs :tab-position="tabPosition" style="height: 70vh;" @tab-click="handleClick" v-if="isShow">
                <el-tab-pane v-for="(item,index) in topList" :key="index" :label="item.tableName">
                    <strong v-if="item.tableName=='订单详情'"><order-details v-if="orderdetails" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='用户信息'"><user-info v-if="userInfo" v-bind:userId="rowList.userId" /></strong>
                    <strong v-if="item.tableName=='通讯录'"><phone-book v-if="phoneBook" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='运营商通话'"><carrieroperator v-if="carrieroperator" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='信用卡报告'"><credit-cards v-if="creditcards" v-bind:userId="rowList.id" /></strong>
                    <strong v-if="item.tableName=='借款信息'"><borrow-money-msg v-if="borrowmoneymsg" v-bind:userId="rowList.userId" /></strong>
                    <strong v-if="item.tableName=='应用列表'"><application v-if="application" v-bind:userId="rowList.id" /></strong>
                </el-tab-pane>
            </el-tabs>
            <!--<span slot="footer" class="dialog-footer">-->
                <!--<el-button @click="dialogVisible = false">{{$t('tips.cancel')}}</el-button>-->
                <!--<el-button type="primary" @click="dialogVisible = false">{{$t('tips.confirm')}}</el-button>-->
            <!--</span>-->
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
    import OrderDetails from '@/components/TabCompontents/OrderDetails'
    export default {
        name: "detailWin",
        data() {
            return {
                isShow:false,
                dialogVisible: false,
                rowList:null,
                tabPosition:'top',
                topList:null,
                orderdetails:true,
                userInfo:true,
                phoneBook:false,
                carrieroperator:false,
                creditcards:false,
                borrowmoneymsg:false,
                application:false,
            };
        },
        components: {
            UserInfo,
            PhoneBook,
            Carrieroperator,
            CreditCards,
            BorrowMoneyMsg,
            Application,
            OrderDetails,
        },
        mounted(){


        },
        methods: {
            getUserInfo(code,data){
                let _this = this
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
                tab.label=='订单详情'?this.orderdetails=true:this.orderdetails=false;
                tab.label=='用户信息'?this.userInfo=true:this.userInfo=false;
                tab.label=='通讯录'?this.phoneBook=true:this.phoneBook=false;
                tab.label=='运营商通话'?this.carrieroperator=true:this.carrieroperator=false;
                tab.label=='信用卡报告'?this.creditcards=true:this.creditcards=false;
                tab.label=='借款信息'?this.borrowmoneymsg=true:this.borrowmoneymsg=false;
                tab.label=='应用列表'?this.application=true:this.application=false;
            }
        }
    }
</script>

<style scoped>

</style>
