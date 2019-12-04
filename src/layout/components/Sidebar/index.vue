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
        <sidebar-item v-for="route in routers" v-show="route.label!='特殊权限'" :key="route.scriptid" :item="route" :base-path="route.scriptid"/>
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
        url: "/system/user/roleMenuFind.htm",
        method: "get",
      }).then(data => {
        console.log(data)
        if (data.code == "2000") {
          _this.routers = data.content
          _this.$store.dispatch('app/setPerm', data.content)
        } else if (data.code == "6520") {

        }
      }).catch(err => {

      })

      console.log(this.routers)
    }
  }
</script>
