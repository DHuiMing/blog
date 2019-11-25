<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="渠道编码：">
                <el-input style="width: 130px" v-model="formInline.code"></el-input>
            </el-form-item>
            <el-form-item label="联系人姓名：">
                <el-input style="width: 130px" v-model="formInline.linker"></el-input>
            </el-form-item>
            <el-form-item label="渠道名称：">
                <el-input style="width: 130px" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="联系方式：">
                <el-input style="width: 130px" v-model="formInline.phone"></el-input>
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
        props:['allList'],
        data() {
            return {
                formInline: {
                    number:'',
                    name:'',
                    roleId:'',
                    status: ''
                },
                searchList:{}
            }
        },
        created() {
        },
        methods: {
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