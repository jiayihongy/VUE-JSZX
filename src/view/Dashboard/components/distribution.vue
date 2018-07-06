<template>
  <div class="distribution">
    <cwrap>
      <Row style="margin-bottom: 10px">
        <Col span="24">
          <Button type="ghost" @click="goBack">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span="12" style="padding-right: 2px">
          <cpanel :title=ltitle>
            <cform :Config="config" :Items="items" :Model="model">
              <Col span="4" slot="otherBtn" style="padding-left: 4px">
                  <Button type="primary" @click="lsearch">搜索</Button>
              </Col>
              <div></div>
            </cform>
            <ctabel
              :conf="tconf"
              :header="theader"
              :data="tdata"
              :pagecf="tpagecf"

            >
              <div></div>
            </ctabel>

          </cpanel>
        </Col>
        <Col span="12" style="padding-left: 2px">
          <cpanel title="路线未分配的分销商">
            <cform :Config="config" :Items="items2" :Model="model">
              <Col span="4" slot="otherBtn" style="padding-left: 4px">
                <Button type="primary" @click="rsearch">搜索</Button>
              </Col>
              <div slot="checkBox">

                  <Col span="24" style="text-align: center">

                    <Checkbox v-for="item in check1"
                              :key="item.key"
                              v-model="item.chooseed"
                    >{{item.value}}</Checkbox>

                  </Col>
                  <Col span="24" style="text-align: center;margin-top: 10px">

                    <Checkbox v-for="item in check2"
                              :key="item.value"
                              v-model="item.chooseed"
                    >{{item.value}}</Checkbox>

                  </Col>
                  <Col span="24" style="text-align: center;margin-top: 10px">
                    <Button type="primary" size="small" @click="confirmOK">确认分配</Button>
                  </Col>

              </div>

              <div></div>
            </cform>
          </cpanel>
        </Col>
      </Row>
      <Modal
        v-model="fpModal"
        @on-ok="okModal"
      >
        <p slot="header" style="color:#ed3f14;text-align:center">
          <Icon type="information-circled"></Icon>
          <span>提示</span>
        </p>
        <p style="text-align: center;font-size: 14px">是否取消路线对该分销商的分配？</p>
      </Modal>
    </cwrap>
  </div>
</template>

<script>
  import Cform from '@/components/commen-form'
  import service from '@/api/fetch'
  import axios from 'axios'
  import {address} from '@/api/api';
  import Ctitle from '@/components/commen-title'
  import Cpanel from '@/components/commen-panel'
  import Ctabel from '@/components/commen-table'
  import Cwrap from '@/components/commen-wrap'
  import Cookies from 'js-cookie'
  import msg from '@/assets/js/message'
  import {goBack} from "../../../assets/js/commonMudle";

  export default {
    name: "distribution",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    mixins:[goBack],
    data(){
      return {
        //左边input
        items:[
            {
              span: 20,
              label: '分销商账号',
              type: 'text',
              prop:'fxszh',
              holder: '请输入需要搜索的分销商账号'
            },
          ],
        //右侧input
        items2:[
            {
              span: 20,
              label: '分销商账号',
              type: 'text',
              prop:'fxszh2',
              holder: '请输入需要搜索的分销商账号'
            },
          ],

        //左边标题个数
        ltitle1:5,
        //获取传参
        userId:this.$route.query.userId,
        //取消分配id
        fpid:'',
        //模态框
        fpModal:false,
        //表单配置
        config: {
          labelW: 75,
          labelP: 'left',
          // isinline:true
        },
        //数据模型
        model: {
          //左边分销商账号
          fxszh: '',
          fxszh2:'',

        },
        //右侧上部分check
        check1:[
          {"key": 1, "value": "加盟店", "chooseed": true},
          {"key": 2, "value": "同行分销商", "chooseed": true},
          {"key": 3, "value": "直营店", "chooseed": true},
          {"key": 4, "value": "业务员", "chooseed": true},
          {"key": 5, "value": "部门", "chooseed": true}],
        //右侧下部分check
        check2:[],
        tpagecf: {
          count: 1,//总条目
          pageSize: 10,//展示条数目
          pageNumber: 1//页码
        },
        tconf: {
          placement: 'top',
          transfer: true
        },
        //表格头
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
            title: '分销商账号',
            key: 'name'
          },
          {
            title: '分销商类型',
            key: 'type'
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
                    type: 'error',
                    size: 'small',
                    icon: 'close'
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {
                      this.fpid = params.row.id;
                      this.fpModal = true;

                    }
                  }
                }, '取消分配'),

              ]);
            }
          }
        ],
        //表格数据
        tdata: [
          {
            name:'哈哈',
            type:'asdf'

          },

        ]
      }
    },
    methods:{

      //左侧搜索
      lsearch(){
        var str = this.model.fxszh.trim();
        var that = this;
        service({
          url:address.distribution,
          data:{
            name:str,
            routeId:that.userId
          }
        }).then(res=>{
          var list = res.fxsList;
          that.ltitle1 = list.length;
          var arr = [];
          list.forEach(function (ele) {
            var obj = {
              name:ele.name,
              type:that.judgeState(ele.type),
              id:ele.id
            }


            arr.push(obj)

          });
          that.tdata=arr;
        })
      },
      //右侧搜索
      rsearch(){
        var str = this.model.fxszh2.trim();
        var that = this;
        service({
          url:address.stayDistribution,
          data:{
            name:str,
            routeId:that.userId
          }
        }).then(res=>{
          var list1 = res.fxsList;
          var arr2 = [];

          list1.forEach(function (ele) {
            var obj={
              key:ele.type,
              value:ele.name,
              chooseed:true,
              id:ele.id
            }
            arr2.push(obj)
          })
          that.check2 = arr2;
        })

      },
      //确定取消
      okModal(){
        var that = this;
        var sysUserId = that.fpid;
        $.ajax({
          url:address.url+address.closeDis,
          type:'post',
          data:{
            routeId:that.userId,
            sysUserId:sysUserId,
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            msg.success(res.MSG);
            that.getIn()
          }else{
            msg.error(res.MSG)
          }
        })
      },
      //确认分配
      confirmOK(){
        var that = this;
        var sysUserId= this.check2.map(ele=>ele.chooseed?ele.id:'').filter(ele=>ele).join(',');
        $.ajax({
          url:address.url+address.saveDis,
          type:'post',
          data:{
            routeId:that.userId,
            sysUserId:sysUserId,
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            msg.success(res.MSG);
            that.getIn()
          }else{
            msg.error(res.MSG)
          }
        })
      },
      //判断身份
      judgeState(num){
        var list = this.check1;
        var str;
        list.forEach(function (ele) {
          if(num == ele.key){
           str =  ele.value;
          }
        })
        return str;
      },
      //获取初始化数据
      getIn(){
        var that = this;
        axios.all([
          service({
            url:address.distribution,
            data:{
              roleId: '',
              id:'',
              routeId:that.userId,
              name:''
            }
          }),
          service({
            url:address.stayDistribution,
            data:{
              roleId: '',
              id:'',
              routeId:that.userId,
              name:''
            }
          })
        ])
        .then(data=>{
          var res = data[0];
          var res1 = data[1];

        //左边已分配处理
          var list = res.fxsList;
          that.ltitle1 = list.length;
          var arr = [];
          list.forEach(function (ele) {
            var obj = {
              name:ele.name,
              type:that.judgeState(ele.type),
              id:ele.id
            }


            arr.push(obj)

          });
          that.tdata=arr;

          //右侧分配处理
          var list1 = res1.fxsList;
          var arr2 = [];

          list1.forEach(function (ele) {
            var obj={
              key:ele.type,
              value:ele.name,
              chooseed:true,
              id:ele.id
            }
            arr2.push(obj)
          })
          that.check2 = arr2;
        })
      }
    },
    created(){
      this.getIn()
    },
    computed:{
      //拼合左title
      ltitle(){
        return `路线已经分配的分销商(共${this.ltitle1}个)`
      },


    },
    watch:{
      check1: {
        handler(curVal, oldVal) {
          var that = this;
          curVal.forEach(ele=>{
            var key = ele.key;
            that.check2.forEach(item=>{
              if(item.key == key){
                item.chooseed = ele.chooseed
              }
            })

          })



        },
        deep: true,
      },
    }
  }
</script>

<style scoped>

</style>
