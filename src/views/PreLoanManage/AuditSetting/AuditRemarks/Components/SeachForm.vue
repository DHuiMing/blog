<template>
    <section class="search-form" v-if="isShow">
        <el-form :inline="true" :model="formInline" class="demo-form-inline" size="mini">
            <el-form-item :label="$t('tab.Reviewnotes')">
                <el-input style="width: 130px" v-model="formInline.value" :placeholder="$t('tab.Reviewnotes')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('tab.OptionType')">
                <el-select style="width: 130px" v-model="formInline.codeType" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in allList.auditTypeList" :label="item" :key="index"  :value="index">{{item}}</el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('table.status')">
                <el-select style="width: 130px" v-model="formInline.state" :placeholder="$t('tab.All')">
                    <el-option v-for="(item,index) in allList.auditStateList" :label="item" :key="index"  :value="index">{{item}}</el-option>
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
        props:['allList'],
        data() {
            return {
                isShow:false,
                formInline: {
                    codeType:'',
                    state:'',
                    number:'',
                    name:'',
                    roleId:'',
                    status: ''
                },
                searchList:{}
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
