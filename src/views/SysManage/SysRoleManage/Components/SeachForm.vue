<template>
    <section class="search-form" v-if="isShow">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="角色名称">
                <el-select style="width: 130px" v-model="formInline.id" placeholder="角色名称">
                    <el-option v-for="(item,index) in searchList.roleList" :label="item.name" :key="index"  :value="item.id">{{item.name}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="角色状态">
                <el-select style="width: 130px" v-model="formInline.isDelete" placeholder="角色状态">
                    <el-option v-for="(item,index) in searchList.roleStateList" :label="item" :key="index"  :value="index">{{item}}</el-option>
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
                    id:'',
                    isDelete: ''
                },
                searchList:{}
            }
        },
        created() {
            if(this.$route.params.code){
                let urls = JSON.parse(this.$route.params.code).data
                for (let i=0;i<urls.length;i++){
                    if(urls[i].type==3){
                        this.getSearchList(urls[i].tableUrl)
                    }
                }
            }
        },
        methods: {
            getSearchList(url){
                let _this = this;
                _this.$axios.post({
                    url: url,
                    callback(res) {
                        _this.searchList=res.content;
                        _this.isShow=true
                    }
                })
            },
            onSubmit() {
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