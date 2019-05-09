<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse"/>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routers" :key="route.scriptid" :item="route" :base-path="route.scriptid"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import Logo from './Logo'
  import SidebarItem from './SidebarItem'
  import variables from '@/styles/variables.scss'

  export default {
    data() {
      return {
        routers: []
      }
    },
    components: {SidebarItem, Logo},
    computed: {
      ...mapGetters([
        'permission_routes',
        'sidebar'
      ]),
      activeMenu() {
        const route = this.$route
        const {meta, path} = route
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      },
      showLogo() {
        return this.$store.state.settings.sidebarLogo
      },
      variables() {
        return variables
      },
      isCollapse() {
        return !this.sidebar.opened
      }
    },
    mounted() {
      // console.log(this.permission_routes)
      let _this = this
      this.$axios({
        url: "system/user/roleMenuFind.htm",
        method: "post",
      }).then(data => {
        if (data.code == "0") {
          _this.routers = data.data
        } else if (data.code == "6520") {

        }
      }).catch(err => {

      })
      // this.routers = [
      //   {
      //     "scriptid": "/sass/account",
      //     "expanded": false,
      //     "sysType": "200",
      //     "children": [{
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "数据概况",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 12,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/SysAcount/sysSeiviceList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "账户信息-服务查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 34,
      //           "parentId": 13
      //         }, {
      //           "scriptid": "/portal/SysAcount/sysSeiviceSave.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "账户信息-新增/编辑服务",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 35,
      //           "parentId": 13
      //         }, {
      //           "scriptid": "/portal/SysAcount/sysMerchantChargeList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "账户信息-账单查询",
      //           "sort": 400,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 81,
      //           "parentId": 13
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/SysAcount/smsAcountEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "账户信息-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 80,
      //           "parentId": 13
      //         }]
      //       },
      //       "scriptid": "/sass/account/accountMsg",
      //       "component": "AccountMsg",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 13
      //     }],
      //     "isDelete": 0,
      //     "menuType": 1,
      //     "remark": "",
      //     "label": "数据统计",
      //     "sort": 100,
      //     "iconCls": "icon-zhanghu-copy",
      //     "isMenu": 1,
      //     "value": 12
      //   }, {
      //     "scriptid": "/sass/operation",
      //     "expanded": false,
      //     "sysType": "200",
      //     "children": [{
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "messageAuditing",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 14,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysOperation/smsTplVerifyList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "短信审核-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 36,
      //           "parentId": 15
      //         }, {
      //           "scriptid": "/portal/sysOperation/smsTplVerify.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "短信审核-审核",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 37,
      //           "parentId": 15
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/sysOperation/smsTplVerifyEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "短信审核-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 66,
      //           "parentId": 15
      //         }]
      //       },
      //       "scriptid": "/sass/operation/messageAuditing",
      //       "component": "MessageAuditing",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 15
      //     }, {
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "children": [{
      //         "sysType": "200",
      //         "isDelete": 0,
      //         "remark": "",
      //         "label": "flag评论",
      //         "sort": 100,
      //         "isMenu": 1,
      //         "leaf": true,
      //         "parentId": 14,
      //         "BtnPermList": {
      //           "3": [{
      //             "scriptid": "/portal/sysOperation/smsTplVerifyList.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 3,
      //             "remark": "",
      //             "label": "短信审核-查询",
      //             "sort": 100,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 36,
      //             "parentId": 15
      //           }, {
      //             "scriptid": "/portal/sysOperation/smsTplVerify.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 3,
      //             "remark": "",
      //             "label": "短信审核-审核",
      //             "sort": 200,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 37,
      //             "parentId": 15
      //           }],
      //           "32": [{
      //             "scriptid": "/portal/sysOperation/smsTplVerifyEnumList.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 32,
      //             "remark": "",
      //             "label": "短信审核-枚举查询",
      //             "sort": 100,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 66,
      //             "parentId": 15
      //           }]
      //         },
      //         "scriptid": "/comment/flage-comment",
      //         "component": "MessageAuditing",
      //         "menuType": 2,
      //         "iconCls": "",
      //         "value": 15
      //       }, {
      //         "sysType": "200",
      //         "isDelete": 0,
      //         "remark": "",
      //         "label": "活动评论",
      //         "sort": 100,
      //         "isMenu": 1,
      //         "leaf": true,
      //         "parentId": 14,
      //         "BtnPermList": {
      //           "3": [{
      //             "scriptid": "/portal/sysOperation/smsTplVerifyList.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 3,
      //             "remark": "",
      //             "label": "短信审核-查询",
      //             "sort": 100,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 36,
      //             "parentId": 15
      //           }, {
      //             "scriptid": "/portal/sysOperation/smsTplVerify.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 3,
      //             "remark": "",
      //             "label": "短信审核-审核",
      //             "sort": 200,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 37,
      //             "parentId": 15
      //           }],
      //           "32": [{
      //             "scriptid": "/portal/sysOperation/smsTplVerifyEnumList.htm",
      //             "sysType": "200",
      //             "isDelete": 0,
      //             "menuType": 32,
      //             "remark": "",
      //             "label": "短信审核-枚举查询",
      //             "sort": 100,
      //             "iconCls": "",
      //             "isMenu": 0,
      //             "value": 66,
      //             "parentId": 15
      //           }]
      //         },
      //         "scriptid": "/comment/activity-comment",
      //         "component": "MessageAuditing",
      //         "menuType": 2,
      //         "iconCls": "",
      //         "value": 15
      //       }],
      //       "label": "评论管理",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 14,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysOperation/smsTplVerifyList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "短信审核-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 36,
      //           "parentId": 15
      //         }, {
      //           "scriptid": "/portal/sysOperation/smsTplVerify.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "短信审核-审核",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 37,
      //           "parentId": 15
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/sysOperation/smsTplVerifyEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "短信审核-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 66,
      //           "parentId": 15
      //         }]
      //       },
      //       "scriptid": "/comment",
      //       "component": "MessageAuditing",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 15
      //     }],
      //     "isDelete": 0,
      //     "menuType": 1,
      //     "remark": "",
      //     "label": "运营管理",
      //     "sort": 200,
      //     "iconCls": "icon-yunying",
      //     "isMenu": 1,
      //     "value": 14
      //   }, {
      //     "scriptid": "/sass/consumer",
      //     "expanded": false,
      //     "sysType": "200",
      //     "children": [{
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "商户管理",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 16,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/SysMerchant/sysMerchantList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 38,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/SysMerchant/sysMerchantSave.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-新增/修改商户",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 39,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/SysMerchant/smsMerchantCharge.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-充值返销",
      //           "sort": 400,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 40,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/SysMerchant/sysMerchantServiceList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-商户账户信息-查询",
      //           "sort": 500,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 41,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/SysMerchant/sysMerchantServiceSave.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-商户账户信息-新增/修改",
      //           "sort": 600,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 42,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/engine/risk/rule.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-决策图",
      //           "sort": 700,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 97,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/engine/risk/rule/update.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管路-决策图-更新",
      //           "sort": 800,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 98,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/engine/risk/datasource/list.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-决策图-数据源列表",
      //           "sort": 900,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 99,
      //           "parentId": 17
      //         }, {
      //           "scriptid": "/portal/engine/risk/rule/add.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "商户管理-决策图-添加",
      //           "sort": 1000,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 100,
      //           "parentId": 17
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/SysMerchant/sysMerchantEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "商户管理-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 83,
      //           "parentId": 17
      //         }]
      //       },
      //       "scriptid": "/sass/consumer/consumerManage",
      //       "component": "ConsumerManage",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 17
      //     }],
      //     "isDelete": 0,
      //     "menuType": 1,
      //     "remark": "",
      //     "label": "商户管理",
      //     "sort": 300,
      //     "iconCls": "icon-shanghu",
      //     "isMenu": 1,
      //     "value": 16
      //   }, {
      //     "scriptid": "/sass/system",
      //     "expanded": false,
      //     "sysType": "200",
      //     "children": [{
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "用户管理",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 18,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysManage/userList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "用户管理-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 43,
      //           "parentId": 19
      //         }, {
      //           "scriptid": "/portal/sysManage/userSave.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "用户管理-新增",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 44,
      //           "parentId": 19
      //         }, {
      //           "scriptid": "/portal/sysManage/userEdit.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "用户管理-修改",
      //           "sort": 300,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 64,
      //           "parentId": 19
      //         }, {
      //           "scriptid": "/portal/sysManage/userUpdate.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "用户管理-锁定/解锁/重置密码",
      //           "sort": 400,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 45,
      //           "parentId": 19
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/sysManage/userEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "用户管理-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 67,
      //           "parentId": 19
      //         }]
      //       },
      //       "scriptid": "/sass/system/user",
      //       "component": "User",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 19
      //     }, {
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "角色管理",
      //       "sort": 200,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 18,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysManage/roleList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "角色管理-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 46,
      //           "parentId": 20
      //         }, {
      //           "scriptid": "/portal/sysManage/roleSaveOrUpdate.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "角色管理-新增/修改",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 47,
      //           "parentId": 20
      //         }, {
      //           "scriptid": "/portal/sysManage/findRoleMenuHas.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "角色管理-权限查询",
      //           "sort": 300,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 48,
      //           "parentId": 20
      //         }, {
      //           "scriptid": "/portal/sysManage/updateRoleMenuHas.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "角色管理-权限分配",
      //           "sort": 400,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 49,
      //           "parentId": 20
      //         }, {
      //           "scriptid": "/portal/sysManage/roleDelete.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "角色管理-删除",
      //           "sort": 500,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 78,
      //           "parentId": 20
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/sysManage/roleEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "角色管理-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 74,
      //           "parentId": 20
      //         }]
      //       },
      //       "scriptid": "/sass/system/role",
      //       "component": "Role",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 20
      //     }],
      //     "isDelete": 0,
      //     "menuType": 1,
      //     "remark": "",
      //     "label": "系统管理",
      //     "sort": 400,
      //     "iconCls": "icon-xitong",
      //     "isMenu": 1,
      //     "value": 18
      //   }, {
      //     "scriptid": "/sass/configure",
      //     "expanded": false,
      //     "sysType": "200",
      //     "children": [{
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "白名单管理",
      //       "sort": 100,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 21,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysConfig/ipWhiteVerifyList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "白名单管理-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 50,
      //           "parentId": 22
      //         }, {
      //           "scriptid": "/portal/sysConfig/ipWhiteVerify.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "白名单管理-审核",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 51,
      //           "parentId": 22
      //         }],
      //         "32": [{
      //           "scriptid": "/portal/sysConfig/ipWhiteVerifyEnumList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 32,
      //           "remark": "",
      //           "label": "白名单管理-枚举查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 75,
      //           "parentId": 22
      //         }]
      //       },
      //       "scriptid": "/sass/configure/whiteList",
      //       "component": "WhiteList",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 22
      //     }, {
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "参数管理",
      //       "sort": 200,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 21,
      //       "BtnPermList": {
      //         "3": [{
      //           "scriptid": "/portal/sysConfig/configList.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "参数管理-查询",
      //           "sort": 100,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 52,
      //           "parentId": 23
      //         }, {
      //           "scriptid": "/portal/sysConfig/configSaveOrUpdate.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "参数管理-新增/修改",
      //           "sort": 200,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 53,
      //           "parentId": 23
      //         }, {
      //           "scriptid": "/portal/sysConfig/configReload.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "参数管理-刷新",
      //           "sort": 300,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 79,
      //           "parentId": 23
      //         }, {
      //           "scriptid": "/portal/sysConfig/reloadAll.htm",
      //           "sysType": "200",
      //           "isDelete": 0,
      //           "menuType": 3,
      //           "remark": "",
      //           "label": "参数管理-缓存清除",
      //           "sort": 400,
      //           "iconCls": "",
      //           "isMenu": 0,
      //           "value": 94,
      //           "parentId": 23
      //         }]
      //       },
      //       "scriptid": "/sass/configure/parameter",
      //       "component": "Parameter",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 23
      //     }, {
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "运营商管理",
      //       "sort": 300,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 21,
      //       "BtnPermList": {},
      //       "scriptid": "/sass/configure/carrie",
      //       "component": "Carrie",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 101
      //     }, {
      //       "sysType": "200",
      //       "isDelete": 0,
      //       "remark": "",
      //       "label": "风控流程管理",
      //       "sort": 400,
      //       "isMenu": 1,
      //       "leaf": true,
      //       "parentId": 21,
      //       "BtnPermList": {},
      //       "scriptid": "/sass/configure/flow",
      //       "component": "Flow",
      //       "menuType": 2,
      //       "iconCls": "",
      //       "value": 103
      //     }],
      //     "isDelete": 0,
      //     "menuType": 1,
      //     "remark": "",
      //     "label": "配置管理",
      //     "sort": 500,
      //     "iconCls": "icon-peizhi",
      //     "isMenu": 1,
      //     "value": 21
      //   }]
      console.log(this.routers)
    }
  }
</script>
