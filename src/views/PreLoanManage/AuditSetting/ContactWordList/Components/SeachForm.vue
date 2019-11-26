<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('tab.ContaceWord')">
                <el-input style="width: 130px" v-model="formInline.name" :placeholder="$t('tab.ContaceWord')"></el-input>
            </el-form-item>


            <!-- <el-form-item label="字典类型"  v-if="isShow">
                <el-select style="width: 130px" v-model="formInline.state" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in searchList.allBorrowState" :label="item" :key="index"  :value="index">{{item}}</el-option>
                </el-select>
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
                isShow:false,
                formInline: {
                    name: '',
                },
                startEndTime:'',
                reviewstartEndTime:'',
                searchList:{}
            }
        },
        created() {
            // if(this.$route.params.code){
            //     let urls = JSON.parse(this.$route.params.code).data
            //     for (let i=0;i<urls.length;i++){
            //         if(urls[i].type==3){
                        this.getSearchList()
            //         }
            //     }
            // }
        },
        methods: {
            getSearchList(){
                let _this = this;
                _this.$axios({
                    method:'get',
                    url: '/manage/loan/searchBorrowList.htm',

                }).then(res => {
          _this.searchList=res.content;
                        _this.isShow=true
}).catch(err => {

})
            },
            onSubmit() {
                if(this.startEndTime){
                    this.formInline.startTime=this.startEndTime[0]
                    this.formInline.endTime=this.startEndTime[1]
                }
                if(this.reviewstartEndTime){
                    this.formInline.reviewStartTime =this.reviewstartEndTime[0]
                    this.formInline.reviewEndTime=this.reviewstartEndTime[1]
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
