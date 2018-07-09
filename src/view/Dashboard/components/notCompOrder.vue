
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="待发团发班计划信息">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel title="待发团发班计划列表">

        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
          @setPS="setps"
          @setP="setp"
        ></ctabel>

      </cpanel>

      <Modal v-model="dftmodal">
        <p slot="header" style="color:#57a3f3;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>提示</span>
        </p>
        <p style="text-align: center;font-size: 14px">是否指配导游？</p>
        <div slot="footer">
          <Button type="error" @click="dftmodal=false">取消</Button>
          <Button type="info" @click="no">否</Button>
          <Button type="primary" @click="ok">是</Button>
        </div>
      </Modal>
      <Modal v-model="qxctmodal" @on-ok="qxctOk">
        <p slot="header" style="color:#57a3f3;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>提示</span>
        </p>
        <p style="text-align: center;font-size: 14px">确认取消这条订单成团吗？</p>
      </Modal>
      <Modal v-model="ttmodal" @on-ok="ttOk">
        <p slot="header" style="color:#57a3f3;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>提示</span>
        </p>
        <p style="text-align: center;font-size: 14px">确认删除这条订单吗？</p>
      </Modal>
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
  import msg from '@/assets/js/message'


  export default {
    name: "notCompOrder",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    data() {


      return {
        ttmodal:false,//退团modal
        dftmodal:false,//成团modal框
        qxctmodal:false,//取消modal
        dftId:'',
        /*form表单参数*/
        config: {
          labelW: 120,
          labelP: 'right',
          // isinline:true
        },
        model: {
          lxmc: '',
          dyxm: '',
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
            title: '已报人数',
            key: 'count'
          },

          {
            title: '操作',
            key: 'action',
            width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div',{
                style:{

                }
              }, [

                h('Button', {
                  props: {
                    type: 'ghost',
                    size: 'small',
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {
                      this.dftId = params.row.id;
                      this.dftmodal = true;
                    }
                  }
                }, '成团'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small',
                  },
                  style: {
                    marginLeft:'2px'
                  },
                  on: {
                    click: () => {
                      this.dftId = params.row.id;
                      this.qxctmodal = true;
                    }
                  }
                }, '取消成团'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon:'edit'
                  },
                  style: {
                    marginLeft:'2px'
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name:'修改发班计划',
                        query:{
                          userId:params.row.id
                        }
                      })
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon:'close'
                  },
                  style: {
                    marginLeft:'2px'
                  },
                  on: {
                    click: () => {
                      this.dftId = params.row.id;
                      this.ttmodal = true;
                    }
                  }
                }, '退团')
              ]);
            }
          }
        ],
        tdata: [
          {
            routeTitle: 'John Brown',
            date: 18,
            count: 0,

          },

        ]


      }
    },
    computed: {},
    methods: {
      ok(){
        this.dftmodal = false

      },
      qxctOk(){
        var that = this;
        $.ajax({
          url:address.url+address.cancelOrder,
          type:'post',
          data:{
            id: that.dftId,
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            msg.success(res.MSG);
            that.getAccounts()
          }else{
            msg.error(res.MSG)
          }
        })
      },
      ttOk(){
        var that = this;
        $.ajax({
          url:address.url+address.deleteOrder,
          type:'post',
          data:{
            id: that.dftId,
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            msg.success(res.MSG);
            that.getAccounts()
          }else{
            msg.error(res.MSG)
          }
        })
      },
      no(){
        var that = this;
        $.ajax({
          url:address.url+address.updatePublishStatus,
          type:'post',
          data:{
            guideOrNot: 0,
            publishId: that.dftId,
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            msg.success(res.MSG);
            that.getAccounts()
          }else{
            msg.error(res.MSG)
          }
        }).then(function (data) {

          $.ajax({
            url:address.url+address.guideDistribute,
            type:'post',
            data:{
              guideOrNot: 0,
              publishId: that.dftId,
              token:Cookies.get('token')
            }
          }).then(res=>{
            console.log(res)
            that.dftmodal=false
          })





        })
      },


      getSonData(data) {

        var conf = {
          routeTitle: data.lxmc,
          guideName: data.dyxm,
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
            status: 1,
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
              count:ele.count,
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
            label: '出发日期',
            prop: 'cfrq',
            type: 'date',
            holder: '请输入需要搜索的出发日期'
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
