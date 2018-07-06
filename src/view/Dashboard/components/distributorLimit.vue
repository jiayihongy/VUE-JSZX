
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="全部分销商额度信息">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel title="分销商列表">
        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
          @setPS="setps"
          @setP="setp"
        ></ctabel>

      </cpanel>

      <modal
        v-model="czmodal"
        @on-ok="okRecharge"
      >
        <p slot="header" style="color:#2d8cf0;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>充值</span>
        </p>
        <Row>
          <Col span="24">
            <p>请输入充值金额</p>
          </Col>
        </Row>
        <Slider v-model="czmoney" :max="100000" show-input>

        </Slider>
      </modal>

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
  import Cookie from 'js-cookie'
  import MSG from '@/assets/js/message'


  export default {
    name: "distributorLimit",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
        czmodal:false,
        czmoney:0,
        czid:'',
        /*form表单参数*/
        config:{
          labelW:120,
          labelP:'right',
          // isinline:true
        },
        model:{
          zhanghao: '',
          shanghu: ''
        },
        items:[
          {
            span:8,
            label:'分销商账号',
            prop:'zhanghao',
            type:'text',
            holder:'请输入需要搜索的分销商账号'
          },
          {
            span:8,
            label:'分销商企业名称',
            prop:'shanghu',
            type:'text',
            holder:'请输入需要搜索的分销商企业名称'
          },

        ],
        /*表格参数*/
        tpagecf:{
          count:1,//总条目
          pageSize:10,//展示条数目
          pageNumber:1//页码
        },
        tconf:{
          placement:'top',
          transfer:true
        },
        theader:[
          {
            title: '序号',
            key: 'num',
            width:60,
            render: (h, params) => {
              return h('div', {
                style: {
                  textAlign:'center'
                },
              }, params.index+1);
            }
          },
          {
            title: '分销商账号',
            key: 'name',
          },
          {
            title: '企业名称',
            key: 'unitName'
          },
          {
            title: '联系人姓名',
            key: 'contactName'
          },
          {
            title: '联系人电话',
            key: 'contactPhone'
          },
          {
            title: '企业税号',
            key: 'ein'
          },
          {
            title: '分销商余额',
            key: 'wallet'
          },
          {
            title: '操作',
            key: 'action',
            width: 180,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    size: 'small',
                    icon:"social-usd"
                  },
                  style: {
                    marginRight: '5px',
                  },
                  on: {
                    click: () => {
                      this.recharge(params.row.id)
                    }
                  }
                }, '充值'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon:'card'
                  },
                  style:{
                    // marginRight:'20px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '交易记录')
              ]);
            }
          }
        ],
        tdata:[
          {
            name: 'John Brown',
            unitName: 18,
            contactName:'阿斯蒂芬',
            contactPhone:18921214521,
            ein:212144545454,
            wallet:6546545
          },

        ]



      }
    },
    computed:{


    },
    methods: {
      //充值
      recharge(id){
        this.czid=id;
        this.czmodal = true;
      },
      okRecharge(){
        var that = this;
        var id = this.czid;
        var rechargePrice = this.czmoney;
        $.ajax({
          url:address.url+address. distributorRecharge,
          type:'post',
          data:{
            id:id,
            rechargePrice:rechargePrice,
            token:Cookie.get('token')
          }
        }).then(res=>{
          if(res.CODE == 200){
            MSG.success(res.MSG);
            that.getAccounts()
          }else {
            MSG.error(res.MSG)
          }
        })
      },
      getSonData(data){

        var conf = {
          name:data.zhanghao,
          unitName:data.shanghu
        }

        this.getAccounts(conf)
      },

      getAccounts(conf={}) {

        service({
          url: address.getDistributor,
          data: {

            unitName:conf.unitName || '',
            name: conf.name ||'',
            showCount:this.tpagecf.pageSize || 10,
            pn: this.tpagecf.pageNumber || 1,

          }

        }).then(res => {

          var arr = []
          var count = res.count;
          var users = res.distributorList;
          users.forEach(function (ele) {
            var obj = {
              name: ele.name,
              unitName: ele.unitName,
              contactName:ele.contactName,
              contactPhone:ele.contactPhone,
              ein:ele.ein,
              wallet:ele.wallet,
              id:ele.id
            }
            arr.push(obj)
          })
          this.tpagecf.count = count
          this.tdata = arr;

        })
      },
      setps(data){
        this.tpagecf.pageSize = data;
        this.getAccounts();
      },
      setp(data){
        this.tpagecf.pageNumber = data;
        this.getAccounts();
      }
    },
    created() {
      this.getAccounts()
    },
    watch:{
      tpagecf:{
        handler(){

        },
        deep:true
      }
    }
  }
</script>

<style lang="scss" module>




</style>
