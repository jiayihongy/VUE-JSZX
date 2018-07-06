<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="全部账户信息">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData"></cform>
      </cpanel>

        <cpanel>
          <div slot="ctitle">
            <ctitle title="用户列表">
              <div>
                <Row>
                  <Col span="11" offset="1">
                    <router-link :to="{name:'新增商户'}">
                      <Button type="primary" icon="person-add" long>新增商户</Button>
                    </router-link>
                  </Col>
                  <Col span="11" offset="1">
                    <router-link :to="{name:'新增导游'}">
                      <Button type="primary" icon="person-add" long>新增导游</Button>
                    </router-link>
                  </Col>
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
  import MSG from '@/assets/js/message'
  import Cookie from 'js-cookie';

  export default {
    name: "allAccounts",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
        /*form表单参数*/
        config:{
          labelW:120,
          labelP:'right',
          // isinline:true
        },
        model:{
          zhanghao: '',
          daoyou: '',
          shenfen: '',
          zhuangtai: '',
          shanghu: '',
        },
        items:[
          {
            span:8,
            label:'用户账号',
            prop:'zhanghao',
            type:'text',
            holder:'请输入账号'
          },
          {
            span:8,
            label:'导游姓名',
            prop:'daoyou',
            type:'text',
            holder:'请输入导游姓名'
          },
          {
            span:8,
            label:'用户身份',
            prop:'shenfen',
            type:'text',
            holder:'请选择',
            options:[
              {
                name:'供应商',
                val:'2'
              },
              {
                name:'分销商',
                val:'3'
              },
              {
                name:'导游',
                val:'4'
              }]
          },
          {
            span:8,
            label:'用户账号状态',
            prop:'zhuangtai',
            type:'text',
            holder:'请选择',
            options:[
              {
                name:'未冻结',
                val:'0'
              },
              {
                name:'已冻结',
                val:'1'
              },
              ]
          },
          {
            span:8,
            label:'商户名称',
            prop:'shanghu',
            type:'text',
            holder:'请输入商户名称'
          }
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
            title: '账号',
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
            title: '导游姓名',
            key: 'realName'
          },
          {
            title: '导游电话',
            key: 'phone'
          },
          {
            title: '用户身份',
            key: 'sysRoleId'
          },
          {
            title: '账号状态',
            key: 'isLock'
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
                    type: 'primary',
                    size: 'small',
                    icon:"ios-medical-outline"
                  },
                  style: {
                    marginRight: '5px',
                    display:params.row.realName?'none':''
                  },
                  on: {
                    click: () => {
                      console.log(params.row.isLockId)
                      this.freeze(params.row.id,params.row.isLockId)
                    }
                  }
                }, params.row.isLockId==1?'解冻':'冻结'),
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon:'document-text'
                  },
                  style:{
                    marginLeft:params.row.realName?'60px':''
                  },
                  on: {
                    click: () => {
                      var that = this;
                      if(params.row.sysRoleId == '导游'){
                          that.updateUser(params.row.id)
                      }else if(params.row.sysRoleId == '供应商'){
                          that.updateBusiness(params.row.id)
                      }

                    }
                  }
                }, '编辑')
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
            realName:'张大炮',
            phone:'13025254514',
            sysRoleId:3,
            isLock:1
          },

        ]



      }
    },
    computed:{


    },
    methods: {
      freeze(id,lockid){
        var that = this;
        $.ajax({
          url:address.url+address.updateUserStatus,
          type:'post',
          data:{
            isLock:lockid,
            id:id,
            token:Cookie.get('token')
          }
        }).then(res=>{

            if(200 == res.CODE){
              MSG.success(res.MSG)
              that.getAccounts()
            }else {
              MSG.error(res.MSG)
            }
        })
      },
      updateUser(id){
        this.$router.push({
          name:'修改导游',
          query:{
            userId:id
          }
        })
      },
      updateBusiness(id){
        this.$router.push({
          name:'修改商户',
          query:{
            userId:id
          }
        })
      },
      judgeState(flag,num){
        /*flag为真判断用户身份，否则判断冻结状态*/
        var degree = [
          {
            name:'供应商',
            val:'2'
          },
          {
            name:'分销商',
            val:'3'
          },
          {
            name:'导游',
            val:'4'
          }
        ]
        var state = [
          {
            name:'未冻结',
            val:'0'
          },
          {
            name:'已冻结',
            val:'1'
          },
        ]
        var obj = flag?degree.filter(ele=> ele.val == num)[0]:obj=state.filter(ele=> ele.val == num)[0];
        return obj.name;
      },

      getSonData(data){

        var conf = {
          name:data.zhanghao,
          realName:data.daoyou,
          sysRoleId:data.shenfen,
          isLock:data.zhuangtai,
          unitName:data.shanghu
        }
        if(conf.realName && conf.unitName){
          MSG.error('导游姓名和商户名称不能同时搜索!')
          return false;
        }
        this.getAccounts(conf)
      },

      getAccounts(conf={}) {
        var that = this;
        service({
          url: address.searchinformation,
          data: {
            realName:conf.realName|| '',
            unitName:conf.unitName || '',
            name: conf.name ||'',
            sysRoleId:conf.sysRoleId || '',
            isLock:conf.isLock || '',
            pageSize:this.tpagecf.pageSize || 10,
            pageNumber: this.tpagecf.pageNumber || 1,

          }

        }).then(res => {

            var arr = []
            var count = res.count;
            var users = res.user;
            users.forEach(function (ele) {
              var obj = {
                name: ele.name,
                unitName: ele.unitName,
                contactName:ele.contactName,
                contactPhone:ele.contactPhone,
                ein:ele.ein,
                realName:ele.realName,
                phone:ele.phone,
                sysRoleId:that.judgeState(true,ele.sysRoleId),
                isLock:that.judgeState(null,ele.isLock),
                isLockId:ele.isLock,
                id:ele.id,
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
