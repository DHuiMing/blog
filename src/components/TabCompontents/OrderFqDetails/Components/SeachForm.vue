<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('tab.OrderNumber')">
                <el-input style="width: 130px" v-model="formInline.orderNo" :placeholder="$t('tab.OrderNumber')"></el-input>
            </el-form-item>
            <el-form-item label="期数">
                <el-input style="width: 130px" v-model="formInline.phase" placeholder="期数"></el-input>
            </el-form-item>
            <el-form-item label="流水号">
                <el-input style="width: 130px" v-model="formInline.serialNumber" placeholder="流水号"></el-input>
            </el-form-item>
            <el-form-item label="还款账号">
                <el-input style="width: 130px" v-model="formInline.repayAccount" placeholder="还款账号"></el-input>
            </el-form-item>
            <el-form-item label="应还款日期">
                <el-date-picker
                        v-model="shouldTime"
                        type="datetimerange"
                        :start-placeholder="$t('table.startdate')"
                        :end-placeholder="$t('table.enddate')"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="实际还款日期">
                <el-date-picker
                        v-model="realityTime"
                        type="datetimerange"
                        :start-placeholder="$t('table.startdate')"
                        :end-placeholder="$t('table.enddate')"
                        value-format="yyyy-MM-dd HH:mm:ss">
                </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('tab.Theorderstatus')" v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.state" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in searchList.borrowState" :key="index" :label="item" :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="还款状态" v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.repayState" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in searchList.repayState" :key="index" :label="item" :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="还款方式" v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.repayWay" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in searchList.repayWay" :key="index" :label="item" :value="index">{{item}}</el-option>
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
                isShow:false,
                formInline: {
                    realName: '',
                    phase: '',
                    serialNumber:'',
                    repayAccount:'',
                    state:'',
                    repayState:'',
                    repayWay:'',
                },
                shouldTime:'',
                realityTime:'',
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
                        _this.isShow=true
                    }
                })
            },
            onSubmit() {
                if(this.shouldTime){
                    this.formInline.startTime=this.shouldTime[0];
                    this.formInline.endTime=this.shouldTime[1];

                }
                if(this.realityTime){
                    this.formInline.realityStartTime =this.shouldTime[0];
                    this.formInline.realityEndTime=this.shouldTime[1];

                }
                this.$emit('changeParmas', this.formInline)
            },
            Reset(){
                this.formInline={};
                this.shouldTime='',
                    this.realityTime='',
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
