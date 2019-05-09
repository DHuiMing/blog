<template>
    <section class="search-form">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item label="用户昵称">
                <el-input style="width: 130px" v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input style="width: 130px" v-model="formInline.phone"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="primary" @click="Reset">重置</el-button>
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
                    phone:'',
                    name:'',
                },
            }
        },
        created() {
            setTimeout(() => {
                this.isShow=true
            }, 0.5 * 1000)
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
