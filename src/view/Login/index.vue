<template>
  <div class="login-container" style="margin: 0px;overflow: hidden;">
    <div class="background">
      <canvas ref="canvas"></canvas>
    </div>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" class="card-box login-form">
      <div class="ytlogo">
        <img src="../../assets/img/logo2.png" alt="" width="100">
      </div>
      <h2 class="ytitle">芜湖集散后台管理系统</h2>
      <FormItem prop="user">
        <Input type="text" v-model="formInline.user" placeholder="请输入账号" clearable @input="syncHand('formInline','user')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input type="password" v-model="formInline.password" placeholder="请输入密码" clearable @input="syncHand('formInline','password')" @keyup.native.enter="handleSubmit('formInline')">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>

  </div>
</template>

<script>

  import {VerifyUserName,VerifyPassword,Setcookie,Setlocal} from "../../utils/tools";
  import service from '@/api/fetch';
  import {address} from '@/api/api';
  import setbackground from '@/assets/js/backAnimation.js'
  export default {
    data () {

      return {
        formInline: {
          user: 'test001',
          password: '111111'
        },
        ruleInline: {
          user: [
            { required: true, trigger: 'blur',validator:this.checkname }
          ],
          password: [
            { required: true,  trigger: 'blur',validator:this.checkpassword},

          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {

            service({
              url:address.login,
              data:{
                name:this.formInline.user,
                password:this.formInline.password
              }
            }).then(res=>{
              if(!!res){
                this.$Message.success('登录成功');
                //获得token
                var token = res.token;
                //token存入cookie
                Setcookie(res.user)
                Setcookie({
                  token:token,
                })
                this.$router.push('/')

              }


            })
          } else {
            this.$Message.error('请检查是否输入出错');
          }
        })
      },
      syncHand(name,props){
        this.$refs[name].validateField(props,function () {

        })
      },
      checkname(rule,value,callback){
        if(!value){
          callback(new Error('用户名不可为空'));
        }else if(!VerifyUserName(value)){
          callback(new Error('请输入5位到16位的由英文或数字组成的账号'))
        }
        callback()
      },
      checkpassword(rule,value,callback){
        if(!value){
          callback(new Error('密码不可为空'))
        }else if(!VerifyPassword(value)){
          callback(new Error('请输入6到16位数字、字母或下划线组成的密码'))
        }
        callback()
      }

    },
    mounted(){

      setbackground(this.$refs.canvas)()

    },
    created(){

    }
  }








  //




</script>


<style rel="stylesheet/scss" lang="scss">
  .ytlogo{
    text-align: center;
  }
  .ytitle{
    font-size: 28px;
    margin-bottom: 10px;
    text-align: center;
    color:#fff;
  }
  .background{
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  .tips{
    font-size: 14px;
    color: #fff;
    margin-bottom: 5px;
  }
  .login-container {
    height: 100vh;

    position: relative;


    .svg-container {
      padding: 6px 5px 6px 15px;
      color: #889aa4;
    }

    .title {
      font-size: 26px;
      font-weight: 400;
      color: #eeeeee;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }

    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
      z-index: 2;
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }

    .forget-pwd {
      color: #fff;
    }
  }

</style>
