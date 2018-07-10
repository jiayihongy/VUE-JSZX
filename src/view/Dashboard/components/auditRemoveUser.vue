
<template>
  <div :class="$style.allaccounts">
    <cwrap>


      <cpanel title="退团订单审核列表">

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
    name: "auditRemoveUser",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    data() {


      return {
        traveldata: '',
        /*form表单参数*/


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
            title: '订单号',
            key: 'orderCode'
          },
          {
            title: '路线名称',
            key: 'title'
          },
          {
            title: '发班日期',
            key: 'date'
          },
          {
            title: '用户姓名',
            key: 'name'
          },
          {
            title: '实际支付',
            key: 'realPay'
          },
          {
            title: '支付状态',
            key: 'status'
          },
          {
            title: '报名渠道',
            key: 'sysUserId'
          },
          {
            title: '新建时间',
            key: 'createTime'
          },
          {
            title: '操作',
            key: 'action',
            width: 160,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'ios-compose-outline'
                  },
                  style: {
                    marginLeft:'5px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name:'审核用户订单',
                        query:{
                          userId:params.row.id,
                          orderId:params.row.nid,
                          status:1
                        }
                      })
                    }
                  }
                }, '详情')
              ]);
            }
          }
        ],
        tdata: [
          {
            orderCode: 'John Brown',
            title: 18,
            date: '阿斯蒂芬',
            name: 18921214521,
            realPay: 212144545454,
            status: '张大炮',
            sysUserId: '13025254514',
            createTime: 3,
          },

        ]


      }
    },
    computed: {},
    methods: {
      payState(num){
        var str='';
        switch(num)
        {
          case 1:
            str = '已支付'
            break;
          case 2:
            str = '未支付'
            break;
          case 3:
            str = '已取消'
            break;
          default:
            str = '已完结'
        }
        return str;
      },



      getAccounts(conf = {}) {
        var that = this;


        service({
          url: address.getCheckOrder,
          data: {
            orderProcessing:2,
            checkState:0,
            showCount: that.tpagecf.pageSize || 10,
            pn:that.tpagecf.pageNumber || 1,

          }

        }).then(function (data) {
          var arr = []
          var count = data.checkOrderCount;
          var users = data.checkOrderList;
          users.forEach(function (ele) {
            var obj = {
              orderCode: ele.orderCode,
              title: ele.title,
              date: ele.date,
              name: ele.name,
              realPay: ele.realPay,
              status: that.payState(ele.status),
              sysUserId: ele.sysUserId== -1?'线上报名':'线下报名',
              createTime: ele.createTime,
              id:ele.id,
              nid:ele.routePublishId
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

      this.getAccounts();
    },
    computed: {

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
