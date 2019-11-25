<!--用户信息-->
<template>
  <div class="home page-body">
      <div class="tagc">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/data/dataInfo' }">{{$t('route.dashboard')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('route.UserManagement')}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{$t('UserAuthInfo')}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
      <div class="con">
      <seach-form @changeParmas="passParmas($event)"></seach-form>
      <list ref="list"></list>
    </div>
  </div>
</template>

<script>
import SeachForm from './Components/SeachForm';
import List from './Components/List';
export default {
    name: 'home',
    data(){
        return{
            power:""
        }
    },
    components: {
        List,
        SeachForm
    },
    mounted(){

        this.power=this.$route.params
    },
    methods:{
        passParmas(childValue){
            this.$refs.list.changeData(childValue);
        },
    }
}
</script>
<style rel="stylesheet/scss" lang="scss">

</style>
