let currencyUrl ="http://ytcx.0553122.com:8088/ytcx";
// let currencyUrl = "http://ytcx.0553122.com/ytcx";
// let currencyUrl = "http://ytcx.0553122.com/ytcx";


export let address = {//获取服务器地址
  url:currencyUrl,
  //登录login
  login: "/inf/LyjsSysLoginAction/login",
  //退出logout
  logout: "/inf/LyjsSysLoginAction/loginOut",

  //批量获取模块详细信息
  module_multi_detail: "/inf/LyjsSysMenuAction/initMenu",
  //是否增加了新的订单
  orderRemind: "/inf/LyjsSysOrderAction/orderRemind",
  //新的审核订单
  orderCountRemind: "/inf/checkOrderAction/orderCountRemind",
  //新的交易记录
  recordCountRemind: "/inf/DealRecordAction/recordCountRemind",

  /**
   * 用户模块
   */
  //用户修改密码
  // 修改密码
  changePwd: "/inf/lyjsSysUserAction/updateUserPwd",
  //用户搜索
  searchinformation: "/inf/lyjsSysUserAction/userList",
  //新建用户
  addUser: "/inf/lyjsSysUserAction/addUser",
  //修改用户状态
  updateUserStatus: "/inf/lyjsSysUserAction/updateStatus",
  //获取用户信息
  getUpdateUser: "/inf/lyjsSysUserAction/returnEditUserInfo",
  //修改用户信息
  updateUser: "/inf/lyjsSysUserAction/editUserInfo",
  //分销商列表
  getDistributor: "/inf/LyjsSysOrderAction/getDistributor",
  //分销商充值
  distributorRecharge: "/inf/LyjsSysOrderAction/distributorRecharge",
  //分销商充值记录
  getDistributorRecharge: "/inf/LyjsSysOrderAction/getDistributorRecharge",

  /**
   * 路线模块
   */
  //图片上传
  uploadFile: "/inf/common/upload/singelUpload",
  //获取新增路线时的路线种类和标签
  initRouteSort: "/inf/lyjsSysRouteAction/initRouteSort",
  //新增路线
  addRoute: "/inf/lyjsSysRouteAction/addRoute",
  //获取个人路线列表
  routeList: "/inf/lyjsSysRouteAction/routeList",
  //获取路线详情
  getRouteDetail: "/inf/lyjsSysRouteAction/getRouteInfo",
  //修改线路
  updateRouteInfo: "/inf/lyjsSysRouteAction/updateRoute",

  //删除线路
  deleteRoute: "/inf/lyjsSysRouteAction/deleteRoute",
  //获取路线日程数据
  getIntroduce: "/inf/lyjsSysRouteAction/getSchedule",
  //保存路线日程内容
  saveIntroduce: "/inf/lyjsSysRouteAction/addOrUpdateSchedule",
  //修改路线为已审核状态
  updateRouteStatus: "/inf/lyjsSysRouteAction/updateRouteStatus",
  //获取已分配的分销商的列表
  distribution: "/inf/lyjsSysRouteAction/getFxsInfoIn",
  //获取未分配的分销商的列表
  stayDistribution: "/inf/lyjsSysRouteAction/getFxsInfoNotIn",
  //取消分销商分配
  closeDis: "/inf/lyjsSysRouteAction/cancelDistribute",
  //增加分销商分配
  saveDis: "/inf/lyjsSysRouteAction/distribute",
  //修改最高成团人数
  updateRoutePeopleNum: "/inf/lyjsSysRouteAction/updateRoutePeopleNum",
  //获取游客类型
  getPriceType: "/inf/lyjsSysRouteAction/getPriceType",

  /**
   * 订单模块
   */
  //获取所有订单信息
  getAllOrder: "/inf/LyjsSysOrderAction/getOrder",
  //添加新的订单
  addOrder: "/inf/lyjsSysRouteAction/addPublish",
  //获取某一条订单的详情
  getOrder: "/inf/LyjsSysOrderAction/getOrderById",
  //修改订单
  editOrder: "/inf/LyjsSysOrderAction/editOrder",
  //删除订单
  deleteOrder: "/inf/LyjsSysOrderAction/deleteOrder",
  //获取可用导游
  getGuide: "/inf/LyjsSysGuideAction/guideList",
  //给导游发短信
  distributeGuide: "/inf/LyjsSysOrderAction/distributeGuide",//ji
  guideDistribute: "/inf/LyjsSysGuideAction/guideDistribute",//xing
  //订单成团
  editOrderStatus: "/inf/LyjsSysOrderAction/editOrderStatus",//ji
  updatePublishStatus: "/inf/LyjsSysGuideAction/updatePublishStatus",//xing
  //订单取消发团
  cancelOrder: "/inf/LyjsSysOrderAction/cancelOrder",
  //查询用户订单
  getUserOrder: "/inf/LyjsSysOrderAction/getUserOrder",
  //增加用户订单
  addUserOrder: "/inf/LyjsSysOrderAction/addUserOrder",
  //增加用户订单获取对应的价格
  getOrderPrice: "/inf/LyjsSysOrderAction/getOrderPrice",
  //删除用户订单
  deleteUserOrder: "/inf/LyjsSysOrderAction/deleteUserOrder",
  //获取某一条用户订单的信息
  getUserOrderById: "/inf/LyjsSysOrderAction/getUserOrderById",
  //修改用户订单
  editUserOrder: "/inf/LyjsSysOrderAction/editUserOrder",
  //获取游客
  getUserContacts: "/inf/LyjsSysOrderAction/getUserContacts",
  //增加游客
  addUserContacts: "/inf/LyjsSysOrderAction/addUserContacts",
  //删除游客
  deleteUserContacts: "/inf/LyjsSysOrderAction/deleteUserContacts",
  //获取游客信息
  getUserContactsById: "/inf/LyjsSysOrderAction/getUserContactsById",
  //更改游客信息
  editUserContacts: "/inf/LyjsSysOrderAction/editUserContacts",
  //获取所有的分销商
  getDistributorList: "/inf/LyjsSysOrderAction/getDistributorList",
  //获取游客信息
  getTouristList: "/inf/LyjsSysOrderAction/getDistributorTourists",
  //订单游客导出
  exportTouristsInfo: "/inf/exportExcel/exportTouristsInfo",
  //获取班次对应的导游和车辆信息
  getGuideDistributeInfo: "/inf/LyjsSysGuideAction/getGuideDistributeInfo",
  //获取班次对应的导游和车辆信息
  editGuideDistributeInfo: "/inf/LyjsSysGuideAction/editGuideDistributeInfo",
  //获取游客类型
  visitorTypeList: "/inf/LyjsSysOrderAction/goOrderPage",
  //编辑游客订单
  visitorTypeListId: "/inf/LyjsSysOrderAction/getUserOrderById",
  /*
       * 营收报表
       * */
  //获取导游报销单信息
  costInfoList: "/inf/LyjsEarningReport/costInfoList",
  //获取导游报销单凭证图片
  selectPicById: "/inf/LyjsEarningReport/selectPicById",
  //修改导游报销凭证是否审核的状态
  updateCostStatus: "/inf/LyjsEarningReport/updateCostStatus",
  //获取营收报表
  getGuideOrder: "/inf/LyjsEarningReport/getGuideOrder",
  /*
       * C端页面管理
       * */
  //查询广告列表
  getAD: "/inf/LyjsADAction/getAD",
  //添加广告
  addAD: "/inf/LyjsADAction/addAD",
  //删除广告
  deleteAD: "/inf/LyjsADAction/deleteAD",
  //获取目的地
  getEndPlace: "/inf/LyjsADAction/getEndPlace",
  //删除目的地
  deleteEndPlace: "/inf/LyjsADAction/deleteEndPlace",
  //添加目的地
  addEndPlace: "/inf/LyjsADAction/addEndPlace",
  //获取标签
  getLabel: "/inf/LyjsADAction/getLabel",
  //添加标签
  addLabel: "/inf/LyjsADAction/addLabel",
  //删除标签
  deleteLabel: "/inf/LyjsADAction/deleteLabel",
  //首页展示标签
  editLabelSite: "/inf/LyjsADAction/editLabelSite",
  /*
       * 用户订单审核
       * */
  //获取审核订单列表
  getCheckOrder: "/inf/LyjsCheckOrderAction/getCheckOrder",
  //获取审核订单详情
  getCheckOrderDetail: "/inf/LyjsCheckOrderAction/getCheckOrderDetail",
  //订单审核
  checkOrder: "/inf/LyjsCheckOrderAction/checkOrder",
  //获取车辆有多少人
  getTouristsCount: "/inf/LyjsCheckOrderAction/getTouristsCount",
  //审核通过新增用户订单时获取价格
  getCheckOrderPrice: "/inf/LyjsCheckOrderAction/getCheckOrderPrice",
  //审核通过删除或修改用户订单时获取价格
  getRealPay: "/inf/LyjsSysOrderAction/getRealPay",
  /*
       * 分销商用户订单审核
       */
  //分销商获取审核用户订单信息
  getCheckOrderDetail: "/inf/LyjsCheckOrderAction/getCheckOrderDetail",
  //分销商修改审核的用户订单
  editCheckOrder: "/inf/LyjsCheckOrderAction/editCheckOrder",
  //分销商删除待审核的用户订单
  deleteCheckOrder: "/inf/LyjsCheckOrderAction/deleteCheckOrder",
}
