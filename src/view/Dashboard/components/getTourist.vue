
<template>
  <div>
    <cwrap>
      <Row style="margin-bottom: 10px">
        <Col span="24">
          <Button type="ghost" @click="goBack">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
        </Col>
      </Row>



      <cpanel>
        <div slot="ctitle">
          <ctitle title="游客列表">
            <div>
                <Row>

                  <Col span="12" offset="12">

                    <Button type="primary" icon="person-add" long @click="exportguide">导出导游</Button>

                  </Col>
                </Row>
            </div>
          </ctitle>
        </div>
        <ctabel
          ref="exportable"
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
    name: "getTourist",
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
        userId:this.$route.query.userId,
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
          transfer: true,
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
            title: '游客姓名',
            key: 'ykxm',
          },
          {
            title: '游客电话',
            key: 'ykdh'
          },
          {
            title: '游客身份证号',
            key: 'yksfzh'
          },

        ],
        tdata: [
          {
            ykxm: 'John Brown',
            ykdh: 18,
            yksfzh: '阿斯蒂芬',
          },

        ]


      }
    },
    computed: {},
    methods: {
      //导出导游
      exportguide(){
        var $table = this.$refs.exportable.$children[0];
        $table.exportCsv({
          filename: 'table'
        })
      },

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
