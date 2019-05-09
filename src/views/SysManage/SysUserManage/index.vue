<template>
    <section>
        <div style="background-color: #fff;margin-bottom: 10px;padding: 10px 6px">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/Index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>系统管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <search-form @changeParmas="passParmas($event)" :allList="allList"></search-form>
        <list ref="list" :allList="allList"></list>
    </section>
</template>

<script>
    import SearchForm from './Components/SearchForm';
    import List from './Components/List';
    export default {
        name: "index",
        data(){
            return{
                allList:{}
            }
        },
        components: {
            List,
            SearchForm
        },
      mounted(){
        let _this = this;
        _this.$axios({
          url: "/portal/sysManage/userEnumList.htm",
          method: "post",
          data: {},
        }).then(res => {
          _this.allList=res.data;
        }).catch(err => {
          console.log(err)
        })
      },
        methods:{
            passParmas(childValue){
                this.$refs.list.changeData(childValue);
            },
        }
    }
</script>

<style scoped>

</style>
