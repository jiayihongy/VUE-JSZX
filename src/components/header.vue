<template>
  <div class="mheader">
    <Header class="mainheader">
      <h2 class="mtitle">
        <Avatar shape="square" :src=ylogo size="large" />
        运泰集散中心后台管理系统</h2>
      <user></user>

    </Header>
  </div>
</template>

<script>
  import User from '@/components/administrators';
  import logo from '@/assets/img/logo.png'
    export default {
        components:{
          User
        },
        data(){
          return {
            ylogo:logo
          }
        }
    }
</script>

<style lang="scss" scoped>
  .mainheader{
    background: #fff;
    box-shadow: 0 2px 3px 2px rgba(0,0,0,.1);
  }
  .mtitle{
    float: left;
  }
  .ivu-avatar-large{
    height: 64px;
    width: 64px;
    line-height: 64px;
  }

</style>
