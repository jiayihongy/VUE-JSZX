<template>
    <div class="sidebarwrap">
      <Sider class="sidebar">
        <Menu active-name="0" theme="dark" width="auto" :open-names="['0']" :accordion=true>

          <router-link :to="{path:'/'}">
            <MenuItem name="0">
              <Icon type="heart"></Icon>
              欢迎页
            </MenuItem>
          </router-link>
          <Submenu name="1">
            <template slot="title">
              <Icon type="person"></Icon>
              用户管理
            </template>
            <router-link :to="{name:'个人信息'}">
              <MenuItem name="1-1">个人信息</MenuItem>
            </router-link>
            <router-link :to="{name:'全部账户信息'}">
              <MenuItem name="1-2">全部账户信息</MenuItem>
            </router-link>
            <router-link :to="{name:'分销商额度信息'}">
              <MenuItem name="1-3">分销商额度信息</MenuItem>
            </router-link>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="navigate"></Icon>
              路线管理
            </template>
            <router-link :to="{name:'查看个人路线'}">
              <MenuItem name="2-1">查看个人路线</MenuItem>
            </router-link>
            <router-link :to="{name:'待审批路线'}">
              <MenuItem name="2-2">待审批路线</MenuItem>
            </router-link>
            <router-link :to="{name:'已审批路线'}">
              <MenuItem name="2-3">已审批路线</MenuItem>
            </router-link>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="clipboard"></Icon>
              订单管理
            </template>
            <router-link :to="{name:'所有订单'}">
              <MenuItem name="3-1">所有订单</MenuItem>
            </router-link>
            <router-link :to="{name:'个人订单'}">
              <MenuItem name="3-2">个人订单</MenuItem>
            </router-link>
            <router-link :to="{name:'待发团订单'}">
              <MenuItem name="3-3">待发团订单</MenuItem>
            </router-link>

          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="arrow-graph-up-right"></Icon>
              营收报表
            </template>
            <router-link :to="{name:'所有订单营收报表'}">
              <MenuItem name="4-1">所有订单营收报表</MenuItem>
            </router-link>

            <router-link :to="{name:'个人订单营收报表'}">
              <MenuItem name="4-2">个人订单营收报表</MenuItem>
            </router-link>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="monitor"></Icon>
              c端页面管理
            </template>
            <router-link :to="{name:'广告位管理'}">
              <MenuItem name="5-1">广告位管理</MenuItem>
            </router-link>
            <router-link :to="{name:'目的地管理'}">
              <MenuItem name="5-2">目的地管理</MenuItem>
            </router-link>
            <router-link :to="{name:'标签管理'}">
              <MenuItem name="5-3">标签管理</MenuItem>
            </router-link>

          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="android-done-all"></Icon>
              用户订单审核
            </template>
            <router-link :to="{name:'新增用户订单审核'}">
              <MenuItem name="6-1">新增用户订单审核</MenuItem>
            </router-link>
            <router-link :to="{name:'修改用户订单审核'}">
              <MenuItem name="6-2">修改用户订单审核</MenuItem>
            </router-link>
            <router-link :to="{name:'删除用户订单审核'}">
              <MenuItem name="6-3">删除用户订单审核</MenuItem>
            </router-link>

          </Submenu>
        </Menu>
      </Sider>
    </div>
</template>

<script>
    import {routerconfig} from "../router";
    import service from '@/api/fetch';
    import {address} from '@/api/api';
    export default {
        name: "sidebar",

        data(){
          return {
            rootRouterList:[],
          }
        },
        methods:{
          module_multi_detail(){
            var that = this;
            service({
              url:address.module_multi_detail,
            }).then(res=>{

              that.handleList(res.menu)

            })
          },
          handleList(ajaxlists){
            var that = this;
            var ajaxlist = JSON.parse(JSON.stringify(ajaxlists))
            console.log(ajaxlist)

            var newlist = [];
            var baselist;
            for(let val of routerconfig){
              if(val.path == '/dashboard'){
                baselist = val.children;
                break;
              }
            }
            // console.log(baselist)


            for(let ele of ajaxlist){
              for(let son of ele.son){
                for(let element of baselist){
                  if(element.name == son.name){
                    for(let key in element){
                      son[key] = element[key]
                    }
                  }
                }

              }

            }

            console.log(ajaxlist)

          }
        },

        created(){
          this.module_multi_detail();
        },
        beforeMount(){

        }
    }
</script>

<style scoped>
  .sidebar{
    position: fixed;
    height: 100vh;
    left: 0;
    overflow: auto;
  }
</style>
