
<template>
  <div class="layout">
    <side-bar></side-bar>
    <Layout class="layout2">
      <mheader></mheader>
      <Content class="mcontent">

         <router-view></router-view>

      </Content>
    </Layout>
  </div>
</template>


<script>


  import service from '@/api/fetch';
  import {clearAllCookie} from "../../utils/tools";
  import {address} from '@/api/api';
  import SideBar from '@/components/sidebar'
  import Mheader from '@/components/header'
  import Coo from 'js-cookie'
  export default {

    components:{
      SideBar,
      Mheader
    },
    data(){
      return {
        name:'',
        transitionName:'',
      }
    },
    created(){



    },
    watch:{
      $route(to, from) {
        //如果to索引大于from索引,判断为前进状态,反之则为后退状态
        if(to.meta.index > from.meta.index){
          //设置动画名称
          this.transitionName = 'slide-left';
        }else{
          this.transitionName = 'slide-right';
        }
      }
    },
    methods:{

    }
  }
</script>
<style lang="scss" scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #fff;
    position: relative;
    border-radius: 4px;
    overflow: auto;
    height: inherit;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout2{
    margin-left: 200px;

  }
  .mcontent{

  }
  .ivu-layout{
    background: #fff;
  }
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all 100ms;
    position: absolute;
  }
  .slide-right-enter {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  .slide-right-leave-active {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-enter {
    opacity: 0;
    transform: translate3d(100%, 0, 0);
  }
  .slide-left-leave-active {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
</style>

