
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="全部营收报表">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel title="全部营收报表列表">

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
    name: "sellReport",
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
            title: '导游姓名',
            key: 'guideName'
          },
          {
            title: '发团日期',
            key: 'date'
          },
          {
            title: '收入',
            key: 'incomePrice'
          },
          {
            title: '支出',
            key: 'isPay',
            // width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div',{
                style:{

                }
              }, [

                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {
                      console.log(params.row.status)
                    }
                  }
                }, '未审核'),
              ]);
            }
          },
          {
            title: '营收',
            key: 'payPrice'
          },



        ],
        tdata: [
          {
            routeTitle: 'John Brown',
            guideName:'sdf',
            date: 18,
            incomePrice:65,
            isPay:0,
            payPrice: 0,

          },

        ]


      }
    },
    computed: {},
    methods: {



      getSonData(data) {

        var conf = {
          routeName: data.lxmc,
          guideName: data.dyxm,

        }

        this.getAccounts(conf)
      },

      getAccounts(conf = {}) {
        var that = this;
        service({
          url: address.getGuideOrder,
          data: {
            roleId:'',
            id:'',
            routeName: conf.routeName || '',
            guideName: conf.guideName || '',
            flag: 0,
            showCount: that.tpagecf.pageSize || 10,
            pn: that.tpagecf.pageNumber || 1,
          }

        }).then(function (res) {

          var arr = []
          var count = res.guideOrderList.length;
          var users = res.guideOrderList;
          users.forEach(function (ele) {
            var obj = {
              routeTitle: ele.routeTitle || '',
              guideName:ele.guideName || '',
              date: ele.date || '',
              incomePrice:ele.incomePrice,
              isPay:ele.isPay,
              payPrice: ele.payPrice?ele.payPrice:'',
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
