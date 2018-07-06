import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import Cookies from 'js-cookie'
import 'jquery-form';
Vue.config.productionTip = false

/* eslint-disable no-new */
Vue.use(iView);
router.beforeEach(function (to,from,next) {
  iView.LoadingBar.start();
  var haslogin = Cookies.get('token');

  if(!haslogin && to.path !== '/login'){
    next({path:'/login'})
  }else{
    next()
  }

})
router.afterEach(to => {
  iView.LoadingBar.finish();
  window.scrollTo(0, 0);
  document.title = `集散中心-${to.name}`
})

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})


