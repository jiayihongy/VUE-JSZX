<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <Row style="margin-bottom: 10px">
        <Col span="24">
          <Button type="ghost" @click="goBack">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
        </Col>
      </Row>
      <cpanel title="线路价格详情">
        <p>暂无数据</p>
      </cpanel>

      <cpanel title="用户订单信息">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel>
        <div slot="ctitle">
          <ctitle title="用户订单列表">
            <div>
              <Row>
                <Row>
                  <Col span="11" offset="1">
                    <router-link :to="{name:'新增商户'}">
                      <Button type="primary" icon="person-add" long>报名</Button>
                    </router-link>
                  </Col>
                  <Col span="11" offset="1">

                    <Button type="primary" icon="person-add" long>导出导游</Button>

                  </Col>
                </Row>
              </Row>
            </div>
          </ctitle>
        </div>
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
  import {goBack} from "../../../assets/js/commonMudle";


  export default {
    name: "signupAllOrderList",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    mixins: [goBack],
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
          yhmc: '',
          zfzt: ''
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
            title: '订单号',
            key: 'name',
          },
          {
            title: '用户姓名',
            key: 'title'
          },
          {
            title: '总人数',
            key: 'routeSortId'
          },
          {
            title: '实际支付',
            key: 'endPlace'
          },
          {
            title: '支付状态',
            key: 'days'
          },
          {
            title: '报名渠道',
            key: 'status'
          },
          {
            title: '新建时间',
            key: 'sysRoleId'
          },

          {
            title: '操作',
            key: 'action',
            width: 120,
            align: 'center',
            render: (h, params) => {
              return h('div', [

                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'flag'
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '发班计划')
              ]);
            }
          }
        ],
        tdata: [
          {
            name: 'John Brown',
            title: 18,
            routeSortId: '阿斯蒂芬',
            endPlace: 18921214521,
            days: 212144545454,
            status: '张大炮',
            sysRoleId: '13025254514',
            createTime: 3,
          },

        ]


      }
    },
    computed: {},
    methods: {



      getSonData(data) {
        console.log(data)
      },

      getAccounts(conf = {}) {

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
            label: '用户名称',
            prop: 'yhmc',
            type: 'text',
            holder: '请输入需要搜索的用户名称'
          },

          {
            span: 8,
            label: '支付状态',
            prop: 'zfzt',
            type: 'text',
            holder: '请选择',
            options: [
              {
                name: '已支付',
                val: 1
              },
              {
                name: '未支付',
                val: 2
              },
              {
                name: '已取消',
                val: 3
              },
              {
                name: '已完结',
                val: 4
              }
            ]
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
