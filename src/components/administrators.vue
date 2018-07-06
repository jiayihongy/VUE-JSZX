<template>
  <div class="user">
    <Dropdown>
      <a href="#">
        <span class="username">{{name}}</span>
        <Avatar icon="person" />
        <Icon type="arrow-down-b"></Icon>
      </a>
      <DropdownMenu slot="list">
        <DropdownItem @click.native="getout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>


  </div>
</template>

<script>
  import service from '@/api/fetch';
  import {clearAllCookie} from "../utils/tools";
  import {address} from '@/api/api';
  import axios from 'axios';
  import Cookies from 'js-cookie';
    export default {
        name: "administrators",
        data(){
          return {
            name:''
          }
        },
        created(){
          this.get_user_info()
        },
        methods:{
          get_user_info(){
            this.name = Cookies.get('realName');
          },
          getout(){
            axios.get(
              address.url+address.logout
            ).then(res=>{
              var data = res.data;
              if(200 === data.CODE){
                this.$Message.success(data.MSG);
                clearAllCookie();
                this.$router.push('/login')
              }

            })
          }

        }
    }
</script>

<style lang="scss" scoped>
  .gray{
    color: #5b6270;
  }
  .user{
    float: right;
    position: relative;
    a{
      color: #5b6270;
    }
    .username{
      display: inline-block;
      font-size: 16px;
      font-weight: 700;
      margin-right: 15px;
      position: relative;
      &:before{
        content: '|';
        position: absolute;
        top: -1px;
        right: -9px;
        font-weight: 100;
        color: #798195;
      }
    }
  }

</style>
