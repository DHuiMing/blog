<template>
    <div v-loading="loading">
        用户信息
        {{userId}}
    </div>
</template>

<script>
    export default {
        name: "review-detail",
        data(){
            return{
                loading:true
            }
        },
        props:['userId'],
        created() {
            this.getUser(this.userId)
        },
        getUser(userId){
            let _this = this;
            _this.$axios.post({
                url: 'manage/loanother/userDetail.htm',
                data: {userId:userId},
                callback(res) {

                    setTimeout(() => {
                        _this.loading = false
                    }, 0.5 * 1000)
                }
            })
        }
    }
</script>

<style scoped>

</style>