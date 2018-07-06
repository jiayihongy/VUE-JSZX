<template>
    <div class="personinfo">
      <Table
        :columns="columns1"
        :data="data1"
        :show-header="false"

      ></Table>
    </div>
</template>

<script>

  import Cookies from 'js-cookie';
  import {address} from '@/api/api';
  import axios from 'axios';
    export default {
        name: "personinfo",
      data () {
        return {
          columns1: [
            {
              title: 'Name',
              key: 'name',
              className: 'demo-table-info-column',

            },
            {
              title: 'Age',
              key: 'value',
              render: (h, params) => {
                return h('div', [
                  h('span',{
                    style: {

                    },
                  }, params.row.value),
                  h('Button', {
                    // attrs: {
                    //   class: 'hideText'
                    // },
                    props: {
                      type: 'primary',
                      size: 'small',
                    },
                    style: {
                      display:params.row.name == '账号'? 'visibility':'none',
                      marginLeft:'10px'
                    },
                    on: {
                      click: () => {
                        this.revisePassword()
                      },
                    }
                  }, '修改密码'),

                ]);
              }

            },

          ],
          data1: [],
          beforepwd:'',
          afterpwd:''
        }
      },
      created(){
        this.getinfo()
      },
      mounted(){

      },
      methods:{
          getinfo(){

            var arr = [
              {
                name: '姓名',
                value: Cookies.get('realName'),
              },
              {
                name: '账号',
                value: Cookies.get('name'),

              },
              {
                name: '身份',
                value:Cookies.get('sysRoleName'),
              },
              {
                name: '电话',
                value: Cookies.get('phone'),
              }
            ];
            this.data1 = arr;
          },
          revisePassword(){
            var that = this;
            this.$Modal.confirm({
              render: (h) => {
                return h('div',[
                  h('Input', {
                    props: {
                      value: this.value,
                      autofocus: true,
                      placeholder: '请输入原密码...',
                      type:'password'
                    },
                    on: {
                      input: (val) => {
                        this.beforepwd = val;
                      }
                    }
                  }),
                  h('Input', {
                    props: {
                      value: this.value,
                      autofocus: true,
                      placeholder: '请修改密码...',
                      type:'password'
                    },
                    on: {
                      input: (val) => {
                        this.afterpwd = val;
                      }
                    }
                  }),
                ])
              },
              okText:'提交',
              loading:true,
              onOk(){
                var before = that.beforepwd;
                var after = that.afterpwd;
                axios(
                  {
                    headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
                    url:address.url+address.changePwd,
                    params:{
                      id:Cookies.get('id'),
                      token:Cookies.get('token'),
                      password:before,
                      newPwd:after

                    }
                  }
                ).then(res=>{
                  var data = res.data;
                  if(data.CODE !== 200){
                    this.$Message.error(data.MSG);
                    setTimeout(() => {
                      this.$data.buttonLoading = false;
                    }, 500);

                  }else{
                    this.$Message.success(data.MSG);
                    setTimeout(() => {
                      this.$data.buttonLoading = false;
                      this.$Modal.remove();
                    }, 500);
                    that.$router.push('/login');
                  }



                })
              },

            })
          }


      }
    }
</script>

<style>

  .ivu-table td.demo-table-info-column{
    font-weight: 600;
    font-size: 14px;
  }


</style>
