import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/Login'
import Dashboard from '@/view/Dashboard/Dashboard'





Vue.use(Router)


let routerconfig = [
  {
    path:'/',
    // redirect:'/dashboard',
    redirect:{path:'/dashboard'},

  },
  {
    path:'/dashboard',
    component:Dashboard,
    children:[
      {
        path:'',
        component:() => import('@/view/Dashboard/components/welcome'),
        name:'欢迎页'
      },
      {
        path:'personinfo',
        component:() => import('@/view/Dashboard/components/personinfo'),
        name:'个人信息'
      },
      {
        path:'allAccounts',
        component:() => import('@/view/Dashboard/components/allAccounts'),
        name:'全部账户信息'
      },
      {
        path:'distributorlimit',
        component:() => import('@/view/Dashboard/components/distributorLimit'),
        name:'分销商额度信息'
      },
      {
        path:'personRoute',
        component:() => import('@/view/Dashboard/components/personRoute'),
        name:'查看个人路线'
      },
      {
        path:'disagreeRoute',
        component:() => import('@/view/Dashboard/components/disAgreeRoute'),
        name:'待审批路线'
      },
      {
        path:'agreedRoute',
        component:() => import('@/view/Dashboard/components/agreedRoute'),
        name:'已审批路线'
      },
      {
        path:'allOrder',
        component:() => import('@/view/Dashboard/components/allOrder'),
        name:'所有订单'
      },
      {
        path:'personOrder',
        component:() => import('@/view/Dashboard/components/personOrder'),
        name:'个人订单'
      },
      {
        path:'notCompOrder',
        component:() => import('@/view/Dashboard/components/notCompOrder'),
        name:'待发团订单'
      },
      {
        path:'sellReport',
        component:() => import('@/view/Dashboard/components/sellReport'),
        name:'所有订单营收报表'
      },
      {
        path:'personSellReport',
        component:() => import('@/view/Dashboard/components/personSellReport'),
        name:'个人订单营收报表'
      },
      {
        path:'AdManage',
        component:() => import('@/view/Dashboard/components/AdManage'),
        name:'广告位管理'
      },
      {
        path:'targetManage',
        component:() => import('@/view/Dashboard/components/targetManage'),
        name:'目的地管理'
      },
      {
        path:'tagManage',
        component:() => import('@/view/Dashboard/components/tagManage'),
        name:'标签管理'
      },
      {
        path:'auditAddUser',
        component:() => import('@/view/Dashboard/components/auditAddUser'),
        name:'新增用户订单审核'
      },
      {
        path:'auditRemoveUser',
        component:() => import('@/view/Dashboard/components/auditRemoveUser'),
        name:'删除用户订单审核'
      },
      {
        path:'audiReviseUser',
        component:() => import('@/view/Dashboard/components/auditReviseUser'),
        name:'修改用户订单审核'
      },
      {
        path:'addBusiness',
        component:() => import('@/view/Dashboard/components/addBusiness'),
        name:'新增商户'
      },
      {
        path:'addUser',
        component:() => import('@/view/Dashboard/components/addUser'),
        name:'新增导游'
      },
      {
        path:'updateUser',
        component:() => import('@/view/Dashboard/components/updateUser'),
        name:'修改导游'
      },
      {
        path:'updateBusiness',
        component:() => import('@/view/Dashboard/components/updateBusiness'),
        name:'修改商户'
      },
      {
        path:'distribution',
        component:() => import('@/view/Dashboard/components/distribution'),
        name:'分配'
      },
      {
        path:'addPlan',
        component:() => import('@/view/Dashboard/components/addPlan'),
        name:'添加发班计划'
      },
      {
        path:'signupAllOrderList',
        component:() => import('@/view/Dashboard/components/signupAllOrderList'),
        name:'所有订单编辑'
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    name:'登录页'
  },
]



export default new Router({
  mode:'hash',
  routes: routerconfig
})
