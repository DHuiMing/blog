<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('tab.OrderNumber')">
                <el-input style="width: 130px" v-model="formInline.orderNo" :placeholder="$t('tab.OrderNumber')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.name')">
                <el-input style="width: 130px" v-model="formInline.realName" :placeholder="$t('table.name')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('table.phone')">
                <el-input style="width: 130px" v-model="formInline.loginName" :placeholder="$t('table.phone')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('tab.Ordergenerationdate')">
                <el-date-picker
                        v-model="formInline.createTime"
                        type="datetimerange"
                        range-separator="至"
                        :start-placeholder="$t('table.startdate')"
                        :end-placeholder="$t('table.enddate')">
                </el-date-picker>
                <!--<el-input style="width: 130px" v-model="formInline.startEndTime" placeholder="订单生成日期"></el-input>-->
            </el-form-item>
            <el-form-item :label="$t('tab.Theorderstatus')">
                <el-select style="width: 130px" v-model="formInline.state" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in searchList.borrowState" :label="item" :value="index">{{item}}</el-option>
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
                formInline: {
                    realName: '',
                    loginName: '',
                    idNo:'',
                    registerClient:'',
                    channelId:'',
                    state:'',
                    startEndTime:'',
                },
                searchList:{}
            }
        },
        created() {
            this.getSearchList('/manage/borrowRepay/repayListDropDownList.htm')
        },
        methods: {
            getSearchList(url){
                let _this = this;
                _this.$axios.get({
                    url: url,
                    callback(res) {

                        _this.searchList=res.content;

                    }
                })
            },
            onSubmit() {
                if(this.formInline.startEndTime){
                    var st = new Date(this.formInline.startEndTime[0])
                    var startTime=st.getFullYear() + '-' + (st.getMonth() + 1) + '-' + st.getDate() + ' ' + st.getHours() + ':' + st.getMinutes() + ':' + st.getSeconds();
                    var et = new Date(this.formInline.startEndTime[1])
                    var endTime=et.getFullYear() + '-' + (et.getMonth() + 1) + '-' + et.getDate() + ' ' + et.getHours() + ':' + et.getMinutes() + ':' + et.getSeconds();
                    delete (this.formInline.startEndTime);
                    this.formInline.startTime=startTime;
                    this.formInline.endTime=endTime;

                }
                this.$emit('changeParmas', this.formInline)
            },
            Reset(){
                this.formInline={};
                this.$emit('changeParmas', {})
            }
        }
    }
</script>

<style scoped>
    .search-form{
        background-color: #fff;
        padding: 16px 10px 0px 10px;
        margin-bottom: 10px;
        border-radius: 6px;
    }
</style>
