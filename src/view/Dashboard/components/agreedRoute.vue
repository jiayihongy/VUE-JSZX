
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="已审批路线">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

      <cpanel title="路线列表">

        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
          @setPS="setps"
          @setP="setp"
        ></ctabel>

      </cpanel>
      <Modal
        v-model="lxlbModal"
        @on-ok="delOk"
      >
        <p slot="header" style="color:#ed3f14;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>提示</span>
        </p>
        <p style="text-align: center;font-size: 14px">
          删除这条路线,数据将永久丢失。
          是否执行删除操作？
        </p>
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
  import axios from 'axios'
  import msg from '@/assets/js/message'


  export default {
    name: "agreedRoute",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    data() {


      return {

        //删除MODAL
        lxlbModal:false,
        eleId:'',

        traveldata: '',//旅游种类（ajax获取）
        /*form表单参数*/
        config: {
          labelW: 120,
          labelP: 'right',
          // isinline:true
        },
        model: {
          lxmc: '',
          lyzl: '',
          mdd: '',
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
            key: 'title',
            render: (h, params) => {
              return h('div', {
                style: {
                  // textAlign: 'center'
                },
                on: {
                  click: () => {
                    console.log(this)
                  }
                }
              }, params.row.title);
            }
          },
          {
            title: '旅游种类',
            key: 'routeSortId',
          },
          {
            title: '目的地',
            key: 'endPlace',
            width:80
          },
          {
            title: '行程天数',
            key: 'days',
          },
          {
            title: '路线来源',
            key: 'sysRoleId'
          },
          {
            title: '创建时间',
            key: 'createTime',
          },
          {
            title: '操作',
            key: 'action',
            width: 230,
            // align: 'center',
            render: (h, params) => {
              return h('div', [

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
                      this.$router.push({
                        name:'分配',
                        query:{
                          userId:params.row.id
                        }
                      })
                    }
                  }
                }, '分配'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'flag'
                  },
                  style: {
                    marginLeft:'5px'
                  },
                  on: {
                    click: () => {
                      var id = params.row.id;
                      this.$router.push({
                        name:'添加发班计划',
                        query:{
                          userId:id,
                          state:1
                        }
                      })
                    }
                  }
                }, '发班计划'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'trash-a'
                  },
                  style: {
                    marginLeft:'5px'
                  },
                  on: {
                    click: () => {
                      this.lxlbModal = true;
                      this.eleId = params.row.id;
                    }
                  }
                }, '删除')
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
      //确认删除
      delOk(){
        var that = this;
        $.ajax({
          url:address.url+address.deleteRoute,
          type:'post',
          data:{
            id:that.eleId,
            token:Cookies.get('token')
          }
        }).then(res=>{
            if(res.CODE == 200){
              msg.success(res.MSG);
              that.getAccounts()
            }else{
              msg.error(res.MSG);
            }
        })
      },



      getRouteSrc(ele){
        var str='';
        if(ele.sysRoleId == 1){
          str = '管理员'
        }
        if(!!ele.unitName){
          str = ele.unitName
        }
        return str;
      },
      getTravelType(num) {
        var arr= this.items;
        var innerarr,
          name;
        arr.forEach(function (ele) {
          if(ele.prop == 'lyzl'){
            innerarr = ele.options || [];
          }
        })
        innerarr.forEach(function (ele) {
          if(ele.val == num){
            name = ele.name
          }
        })
        return name;
      },

      getSonData(data) {
        var conf = {
          title: data.lxmc,
          routeSortId: data.lyzl,
          endPlace: data.mdd
        }

        this.getAccounts(conf)
      },

      getAccounts(conf = {}) {
        var that = this;
        axios.all([
          service({
            url: address.initRouteSort,
            data: {
              isLabel: 0
            }
          }),
          service({
            url: address.routeList,
            data: {
              id:'',
              title: conf.title || '',
              routeSortId: conf.routeSortId || '',
              label: '',
              status: 2,
              endPlace: conf.endPlace || '',
              pageSize: that.tpagecf.pageSize || 10,
              pageNumber: that.tpagecf.pageNumber || 1,
              roleId: Cookies.get('sysRoleId'),
              createBy:''
            }

          })
        ]).then(function (data) {
          var res = data[0];
          var res1 = data[1];
          /*处理旅行种类数据
          * */
          var travelarr = res.routes;
          var realtravel = travelarr.map(function (ele) {
            return {
              name: ele.routeSort,
              val: ele.routeSortId
            }
          })
          that.traveldata = realtravel;
          /*处理表格数据
          * */
          var arr = []
          var count = res1.count;
          var users = res1.routeList;
          users.forEach(function (ele) {
            var obj = {
              name: ele.name,
              title: ele.title,
              routeSortId:that.getTravelType(ele.routeSortId),
              endPlace:ele.endPlace,
              days:ele.days,
              sysRoleId:that.getRouteSrc(ele),
              createTime:ele.createTime,
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
      this.getTravelType()
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
            label: '旅游种类',
            prop: 'lyzl',
            type: 'text',
            holder: '请选择',
            options: this.traveldata
          },
          {
            span: 8,
            label: '目的地',
            prop: 'mdd',
            type: 'text',
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
