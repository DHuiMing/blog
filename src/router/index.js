import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import tableRouter from './modules/table'


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        redirect: '/data/dataInfo',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/dataInfo',
    children: [
      {
        path: '/data/dataInfo',
        component: () => import('@/views/Data/DataInfo/index'),
        name: 'DataInfo',
        meta: { title: 'DataInfo', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path:'/userManage',
    name:'userManage',
    component:Layout,
    redirect:'/userManage/userInfo',
    children:[
      {
        path:'/userManage/userInfo',
        name:'userInfo',
        component:() => import('@/views/UserManage/UserInfo/index.vue'),
        meta: {title: 'userinfo', icon: 'test'},
      },
      {
        path:'/userManage/feedbackList',
        name:'feedbackList',
        component:() => import('@/views/UserManage/FeedbackList/index.vue'),
        meta: {title: 'feedbackList', icon: 'test2'},
      }
    ]
  },
  {
    path:'/system',
    name:'system',
    component:Layout,
    redirect:'/system',
    children:[
      {
        path:'/system/role',
        name:'/system/role',
        component:() => import('@/views/SysManage/SysRoleManage/index.vue'),
        meta: {title: 'role', icon: 'test'},
      },
      {
        path:'/system/user',
        name:'/system/user',
        component:() => import('@/views/SysManage/SysUserManage/index.vue'),
        meta: {title: 'user', icon: 'test2'},
      }
    ]
  },
  {
    path:'/comment',
    name:'comment',
    component:Layout,
    redirect:'/comment/flage-comment',
    children:[
      {
        path:'/comment/flage-comment',
        name:'/comment/flage-comment',
        component:() => import('@/views/SysManage/SysRoleManage/index.vue'),
        meta: {title: 'flage', icon: 'test'},
      },
      {
        path:'/comment/activity-comment',
        name:'/comment/activity-comment',
        component:() => import('@/views/SysManage/SysUserManage/index.vue'),
        meta: {title: 'activity', icon: 'test2'},
      }
    ]
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  /** when your routing map is too long, you can split it into small modules **/
  tableRouter,
  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/i18n-demo/index'),
        name: 'I18n',
        meta: { title: 'i18n', icon: 'international' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
