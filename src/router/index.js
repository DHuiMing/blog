import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import tableRouter from './modules/table'

export const constantRoutes = [{
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [{
      path: '/redirect/:path*',
      component: () => import('@/views/redirect/index')
    }]
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
    children: [{
      path: 'dashboard',
      redirect: '/data/dataInfo',
      component: () => import('@/views/dashboard/index'),
      name: 'Dashboard',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/data',
    component: Layout,
    redirect: '/data/dataInfo',
    children: [{
      path: '/data/dataInfo',
      component: () => import('@/views/Data/DataInfo/index'),
      name: 'DataInfo',
      meta: {
        title: 'DataInfo',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/UserBaseInfo', //用户管理    用户信息
    component: Layout,
    children: [{
      path: '/UserBaseInfo',
      component: () => import('@/views/UserManage/UserBaseInfo/index.vue'),
      name: 'UserBaseInfo',
      meta: {
        title: '用户信息',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/UserAuthInfo', //用户管理    用户认证信息
    component: Layout,
    children: [{
      path: '/UserAuthInfo',
      component: () => import('@/views/UserManage/UserAuthInfo/index.vue'),
      name: 'UserAuthInfo',
      meta: {
        title: '用户认证信息',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/ThirdPartyInfo', //用户管理    第三方数据信息
    component: Layout,
    children: [{
      path: '/ThirdPartyInfo',
      component: () => import('@/views/UserManage/ThirdPartyInfo/index.vue'),
      name: 'ThirdPartyInfo',
      meta: {
        title: '第三方数据信息',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/AfterUser', //用户管理    复借用户
    component: Layout,
    children: [{
      path: '/AfterUser',
      component: () => import('@/views/UserManage/AfterUser/index.vue'),
      name: 'AfterUser',
      meta: {
        title: '复借用户',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/AllOrder', //订单管理    全部订单
    component: Layout,
    children: [{
      path: '/AllOrder',
      component: () => import('@/views/OrderManage/AllOrder/index.vue'),
      name: 'AllOrder',
      meta: {
        title: '全部订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/AlreadyOrder', //订单管理    已还订单
    component: Layout,
    children: [{
      path: '/AlreadyOrder',
      component: () => import('@/views/OrderManage/AlreadyOrder/index.vue'),
      name: 'AlreadyOrder',
      meta: {
        title: '已还订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/OverdueOrder', //订单管理    逾期中订单
    component: Layout,
    children: [{
      path: '/OverdueOrder',
      component: () => import('@/views/OrderManage/OverdueOrder/index.vue'),
      name: 'OverdueOrder',
      meta: {
        title: '逾期中订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/BadOrder', //订单管理    坏账订单
    component: Layout,
    children: [{
      path: '/BadOrder',
      component: () => import('@/views/OrderManage/BadOrder/index.vue'),
      name: 'BadOrder',
      meta: {
        title: '坏账订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/PreLoanOrder', //贷前管理    贷前订单
    component: Layout,
    children: [{
      path: '/PreLoanOrder',
      component: () => import('@/views/PreLoanManage/PreLoanOrder/index.vue'),
      name: 'PreLoanOrder',
      meta: {
        title: '贷前订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/AuditWorkbench', //贷前管理    信审工作台
    component: Layout,
    children: [{
      path: '/AuditWorkbench',
      component: () => import('@/views/PreLoanManage/AuditWorkbench/index.vue'),
      name: 'AuditWorkbench',
      meta: {
        title: '信审工作台',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/AuditRecord', //贷前管理    人工信审记录
    component: Layout,
    children: [{
      path: '/AuditRecord',
      component: () => import('@/views/PreLoanManage/AuditRecord/index.vue'),
      name: 'AuditRecord',
      meta: {
        title: '人工信审记录',
        icon: 'dashboard',
        affix: false
      }
    }]
  },{
    path: '/AuditRemarks', //贷前管理    风控信审设置 复审备注项库
    component: Layout,
    children: [{
      path: '/AuditRemarks',
      component: () => import('@/views/PreLoanManage/AuditSetting/AuditRemarks/index.vue'),
      name: 'AuditRemarks',
      meta: {
        title: '复审备注项库',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/ContactWordList', //贷前管理    风控信审设置 通讯录字典库
    component: Layout,
    children: [{
      path: '/ContactWordList',
      component: () => import('@/views/PreLoanManage/AuditSetting/ContactWordList/index.vue'),
      name: 'ContactWordList',
      meta: {
        title: '通讯录字典库',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/StateList', //贷前管理    风控信审设置 省份字典库
    component: Layout,
    children: [{
      path: '/StateList',
      component: () => import('@/views/PreLoanManage/AuditSetting/StateList/index.vue'),
      name: 'StateList',
      meta: {
        title: '省份字典库',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/AuditorManage', //贷前管理    风控信审设置 信审人员管理
    component: Layout,
    children: [{
      path: '/AuditorManage',
      component: () => import('@/views/PreLoanManage/AuditSetting/AuditorManage/index.vue'),
      name: 'AuditorManage',
      meta: {
        title: '信审人员管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/DisbursalChecking', //贷中管理    放款审核
    component: Layout,
    children: [{
      path: '/DisbursalChecking',
      component: () => import('@/views/LoaningManage/DisbursalChecking/index.vue'),
      name: 'DisbursalChecking',
      meta: {
        title: '放款审核',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/NBFCRecord', //贷中管理    NBFC
    component: Layout,
    children: [{
      path: '/NBFCRecord',
      component: () => import('@/views/LoaningManage/NBFCRecord/index.vue'),
      name: 'NBFCRecord',
      meta: {
        title: 'NBFC',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/DisbursalRecord', //贷中管理    放款记录
    component: Layout,
    children: [{
      path: '/DisbursalRecord',
      component: () => import('@/views/LoaningManage/DisbursalRecord/index.vue'),
      name: 'DisbursalRecord',
      meta: {
        title: '放款记录',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/RepaymentRecord', //贷后管理    还款记录
    component: Layout,
    children: [{
      path: '/RepaymentRecord',
      component: () => import('@/views/AfterLoanManage/RepaymentRecord/index.vue'),
      name: 'RepaymentRecord',
      meta: {
        title: '还款记录',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/CollectionOrder', //催收管理    催收总订单
    component: Layout,
    children: [{
      path: '/CollectionOrder',
      component: () => import('@/views/CollectionManage/CollectionOrder/index.vue'),
      name: 'CollectionOrder',
      meta: {
        title: '催收总订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/Collector', //催收管理    催收人员
    component: Layout,
    children: [{
      path: '/Collector',
      component: () => import('@/views/CollectionManage/Collector/index.vue'),
      name: 'Collector',
      meta: {
        title: '催收人员',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/MyCase', //催收工作台    我的催单
    component: Layout,
    children: [{
      path: '/MyCase',
      component: () => import('@/views/CollectionWorkbench/MyCase/index.vue'),
      name: 'MyCase',
      meta: {
        title: '我的催单',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/UcompletedCase', //催收工作台    待催收订单
    component: Layout,
    children: [{
      path: '/UcompletedCase',
      component: () => import('@/views/CollectionWorkbench/UcompletedCase/index.vue'),
      name: 'UcompletedCase',
      meta: {
        title: '待催收订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/CollectingCase', //催收工作台    催收中订单
    component: Layout,
    children: [{
      path: '/CollectingCase',
      component: () => import('@/views/CollectionWorkbench/CollectingCase/index.vue'),
      name: 'CollectingCase',
      meta: {
        title: '催收中订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/CompletedCase', //催收工作台    催收成功订单
    component: Layout,
    children: [{
      path: '/CompletedCase',
      component: () => import('@/views/CollectionWorkbench/CompletedCase/index.vue'),
      name: 'CompletedCase',
      meta: {
        title: '催收成功订单',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/KeyIndex', //数据统计   关键指标
    component: Layout,
    children: [{
      path: '/KeyIndex',
      component: () => import('@/views/DataStatistics/KeyIndex/index.vue'),
      name: 'KeyIndex',
      meta: {
        title: '关键指标',
        icon: 'dashboard',
        affix: false
      }
    }]
  },{
    path: '/BorrowingStatistic', //数据统计    借款统计
    component: Layout,
    children: [{
      path: '/BorrowingStatistic',
      component: () => import('@/views/DataStatistics/BorrowingStatistic/index.vue'),
      name: 'BorrowingStatistic',
      meta: {
        title: '借款统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/RepaymentStatistic', //数据统计    还款统计
    component: Layout,
    children: [{
      path: '/RepaymentStatistic',
      component: () => import('@/views/DataStatistics/RepaymentStatistic/index.vue'),
      name: 'RepaymentStatistic',
      meta: {
        title: '还款统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/UserStatistic', //数据统计    用户统计
    component: Layout,
    children: [{
      path: '/UserStatistic',
      component: () => import('@/views/DataStatistics/UserStatistic/index.vue'),
      name: 'UserStatistic',
      meta: {
        title: '用户统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/ChannelStatistic', //数据统计    渠道统计
    component: Layout,
    children: [{
      path: '/ChannelStatistic',
      component: () => import('@/views/DataStatistics/ChannelStatistic/index.vue'),
      name: 'ChannelStatistic1',
      meta: {
        title: '渠道统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/ProfitStatistic', //数据统计    利润统计
    component: Layout,
    children: [{
      path: '/ProfitStatistic',
      component: () => import('@/views/DataStatistics/ProfitStatistic/index.vue'),
      name: 'ProfitStatistic',
      meta: {
        title: '利润统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/CollectionStatistic', //数据统计    催收统计
    component: Layout,
    children: [{
      path: '/CollectionStatistic',
      component: () => import('@/views/DataStatistics/CollectionStatistic/index.vue'),
      name: 'CollectionStatistic',
      meta: {
        title: '催收统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/CollectorStatistic', //数据统计    催收员统计
    component: Layout,
    children: [{
      path: '/CollectorStatistic',
      component: () => import('@/views/DataStatistics/CollectorStatistic/index.vue'),
      name: 'CollectorStatistic',
      meta: {
        title: '催收员统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/SysRoleManage', //角色管理
    component: Layout,
    children: [{
      path: '/SysRoleManage',
      component: () => import('@/views/SysManage/SysRoleManage/index.vue'),
      name: 'SysRoleManage',
      meta: {
        title: '角色管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/SysUserManage', //用户管理
    component: Layout,
    children: [{
      path: '/SysUserManage',
      component: () => import('@/views/SysManage/SysUserManage/index.vue'),
      name: 'SysUserManage',
      meta: {
        title: '用户管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/SysMenuManage', //菜单管理
    component: Layout,
    children: [{
      path: '/SysMenuManage',
      component: () => import('@/views/SysManage/SysMenuManage/index.vue'),
      name: 'SysMenuManage',
      meta: {
        title: '菜单管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/SysDicManage', //字典管理
    component: Layout,
    children: [{
      path: '/SysDicManage',
      component: () => import('@/views/SysManage/SysDicManage/index.vue'),
      name: 'SysDicManage',
      meta: {
        title: '字典管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/SysArgManage', //系统参数设置
    component: Layout,
    children: [{
      path: '/SysArgManage',
      component: () => import('@/views/SysManage/SystemParameterSettings/index.vue'),
      name: 'SysArgManage',
      meta: {
        title: '系统参数设置',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/ChannelList', //渠道管理
    component: Layout,
    children: [{
      path: '/ChannelList',
      component: () => import('@/views/PipelineManage/ChannelManage/index.vue'),
      name: 'ChannelList',
      meta: {
        title: '渠道管理',
        icon: 'dashboard',
        affix: false
      }
    }]
  },
  {
    path: '/ChannelStatistic', //渠道信息统计
    component: Layout,
    children: [{
      path: '/ChannelStatistic',
      component: () => import('@/views/PipelineManage/ChannelInformationStatistics/index.vue'),
      name: 'ChannelStatistic',
      meta: {
        title: '渠道信息统计',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/TimedTaskList', //任务列表
    component: Layout,
    children: [{
      path: '/TimedTaskList',
      component: () => import('@/views/TaskManage/TimedTaskList/index.vue'),
      name: 'TimedTaskList',
      meta: {
        title: '任务列表',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/TimedTaskLog', //执行记录
    component: Layout,
    children: [{
      path: '/TimedTaskLog',
      component: () => import('@/views/TaskManage/TimedTaskLog/index.vue'),
      name: 'TimedTaskLog',
      meta: {
        title: '执行记录',
        icon: 'dashboard',
        affix: false
      }
    }]
  }, {
    path: '/UserDetails', //详情
    component: Layout,
    children: [{
      path: '/UserDetails',
      component: () => import('@/components/TabCompontents/Details.vue'),
      name: 'UserDetails',
      meta: {
        title: '用户详情',
        icon: 'dashboard',
        affix: false
      }
    }]
  }
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
    children: [{
        path: '401',
        component: () => import('@/views/error-page/401'),
        name: 'Page401',
        meta: {
          title: 'page401',
          noCache: true
        }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404'),
        name: 'Page404',
        meta: {
          title: 'page404',
          noCache: true
        }
      }
    ]
  },
  {
    path: '/i18n',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/i18n-demo/index'),
      name: 'I18n',
      meta: {
        title: 'i18n',
        icon: 'international'
      }
    }]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
