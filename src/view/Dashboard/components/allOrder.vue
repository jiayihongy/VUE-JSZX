
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="全部发班计划">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel title="发班计划列表">

        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
          @setPS="setps"
          @setP="setp"
        ></ctabel>

      </cpanel>


    </cwrap>


  </div>
</template>

<script>
  import Cform from '@/components/commen-form'
  import service from '@/api/fetch'
  import {address} from '@/api/api';
  import Ctitle from '@/components/commen-title'
  import Cpanel from '@/components/commen-panel'
  import Ctabel from '@/components/commen-table'
  import Cwrap from '@/components/commen-wrap'
  import Cookies from 'js-cookie'
  import axios from 'axios'


  export default {
    name: "allOrder",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    data() {


      return {
        traveldata: '',
        /*form表单参数*/
        config: {
          labelW: 120,
          labelP: 'right',
          // isinline:true
        },
        model: {
          lxmc: '',
          dyxm: '',
          ddzt: '',
          cfrq: '',
        },
        /*表格参数*/
        tpagecf: {
          count: 1,//总条目
          pageSize: 10,//展示条数目
          pageNumber: 1//页码
        },
        tconf: {
          placement: 'top',
          transfer: true
        },
        theader: [
          {
            title: '序号',
            key: 'num',
            width: 60,
            render: (h, params) => {
              return h('div', {
                style: {
                  textAlign: 'center'
                },
              }, params.index + 1);
            }
          },
          {
            title: '路线名称',
            key: 'routeTitle'
          },
          {
            title: '发团日期',
            key: 'date'
          },
          {
            title: '发班状态',
            key: 'status'
          },

          {
            title: '操作',
            key: 'action',
            width: 200,
            align: 'center',
            render: (h, params) => {
              return h('div',{
                style:{
                  display:params.row.status == '已成团'?'block':'none'
                }
              }, [

                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name:'所有订单编辑',
                        query:{
                          userId:params.row.id
                        }
                      })
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'document-text'
                  },
                  style: {
                    marginLeft:'5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name:'修改导游和车辆信息',
                        query:{
                          userId:params.row.id
                        }
                      })
                    }
                  }
                }, '修改导游')
              ]);
            }
          }
        ],
        tdata: [
          {
            routeTitle: 'John Brown',
            date: 18,
            status: '阿斯蒂芬',

          },

        ]


      }
    },
    computed: {},
    methods: {
      getOrderState(num){
        var result;
        var arr = this.items.filter(ele => ele.prop == 'ddzt')[0]['options'];
        arr.forEach(ele=>{
          if(ele.val == num){
            result = ele.name;
          }
        });

        return result;
      },


      getSonData(data) {

        var conf = {
          routeTitle: data.lxmc,
          guideName: data.dyxm,
          status: data.ddzt,
          date:data.cfrq
        }

        this.getAccounts(conf)
      },

      getAccounts(conf = {}) {
        var that = this;
        service({
          url: address.getAllOrder,
          data: {
            roleId:'',
            id:'',
            routeTitle: conf.routeTitle || '',
            guideName: conf.guideName || '',
            flag: 0,
            status: conf.status,
            date: conf.date || '',
            showCount: that.tpagecf.pageSize || 10,
            pn: that.tpagecf.pageNumber || 1,
          }

        }).then(function (res) {
          var arr = []
          var count = res.count;
          var users = res.orderList;
          users.forEach(function (ele) {
            var obj = {
              routeTitle: ele.routeTitle,
              date: ele.date,
              status: that.getOrderState(ele.status),
              id:ele.id
            }
            arr.push(obj)
          })
          that.tpagecf.count = count
          that.tdata = arr;
        })
      },
      setps(data) {
        this.tpagecf.pageSize = data;
        this.getAccounts();
      },
      setp(data) {
        this.tpagecf.pageNumber = data;
        this.getAccounts();
      }
    },
    created() {
      this. getOrderState(1)
      this.getAccounts();
    },
    computed: {
      items() {
        return [
          {
            span: 8,
            label: '路线名称',
            prop: 'lxmc',
            type: 'text',
            holder: '请输入需要搜索的路线名称'
          },
          {
            span: 8,
            label: '导游姓名',
            prop: 'dyxm',
            type: 'text',
            holder: '请输入需要搜索的导游姓名'
          },
          {
            span: 8,
            label: '订单状态',
            prop: 'ddzt',
            type: 'text',
            holder: '请选择',
            options: [
              {name:'待发团',val:1},
              {name:'已成团',val:2},
              {name:'已发团',val:5},
              {name:'已完结',val:3},
              {name:'已取消',val:4},
              ]
          },
          {
            span: 8,
            label: '出发日期',
            prop: 'cfrq',
            type: 'date',
            holder: '请输入需要搜索的目的地'
          }
        ]
      }
    },
    watch: {
      tpagecf: {
        handler() {

        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" module>


</style>
