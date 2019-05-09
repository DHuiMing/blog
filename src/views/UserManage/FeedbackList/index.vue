<!--用户反馈列表-->
<template>
    <section>
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
