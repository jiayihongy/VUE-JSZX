<template>
  <div>
    <cwrap>
      <cpanel title="添加用户订单">
        <Card>
          <cform :Config="config" :Items="items" :Model="model" :Rules="formRules" >
            <div>
              <Row>
                <Col span="24">
                  <span style="display: inline-block;width: 100px">是否同游</span>
                  <i-switch v-model="sfty" @on-change="tySwich">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                  <Button type="primary" shape="circle" icon="plus-round" size="small">增加游客</Button>
                </Col>
              </Row>
            </div>
          </cform>
        </Card>


        <Card style="margin-top: 20px">
          <div style="text-align: center;padding-bottom: 10px">
            <Tag color="green">主要联系人</Tag>
          </div>
          <cform :Config="config" :Items="items2" :Model="model" :Rules="formRules">

            <Col span="24">
              <FormItem>
                <Button type="primary" :disabled="isDisabed"  @click="save">保存</Button>

                <Button type="error" style="margin-left: 8px" @click="goback">取消</Button>
              </FormItem>
            </Col>
          </cform>
        </Card>
      </cpanel>





    </cwrap>


  </div>
</template>

<script>
  import Cform from '@/components/commen-form'
  import {address} from '@/api/api';
  import Ctitle from '@/components/commen-title'
  import Cpanel from '@/components/commen-panel'
  import Ctabel from '@/components/commen-table'
  import Cwrap from '@/components/commen-wrap'
  import Cookies from 'js-cookie'
  import MSG from '@/assets/js/message'
  import service from '@/api/fetch'
  import {VerifyNumber,VerifyPhone,VerifyIDCard} from "../../../utils/tools";

  export default {
    name: "adminAddUserOrder",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
        fxslist:'',//分销商下拉表
        userId:this.$route.query.userId,
        isDisabed:true,//禁用保存按钮
        /*form表单参数*/
        formRules:{
          dyzh: [
            { required: true,  trigger: 'change',validator:this.checkNumber},
          ],
          dydh: [
            { required: true,  trigger: 'change',validator:this.checkPhone},
          ],
          dysfzh: [
            { required: true,  trigger: 'change',validator:this.checkIDCard},
          ]
        },//表单验证
        config:{
          labelW:100,
          labelP:'left',
          // isinline:true
        },
        model:{
          fxs:'',
          lxrxm:'',
          lxrsjh:'',
          sfzh:'',
          ykxm:'',
          ykdh:'',
          yksfzh:'',
          ykch:'',
          ykzwh:''
        },
        sfty:false,
        bz:'',
        lxryx:'',
      }
    },
    watch:{
      model:{
        handler(params, oldVal){

          for(var key in params){
            if(!params[key]){
              this.isDisabed = true
              return false; // 终止程序
            }
          }
          this.isDisabed = false;

        },
        deep:true
      }

    },
    methods: {
      checkNumber(rule,value,callback){

        if(!VerifyNumber(value)){
          callback(new Error('请输入数字'));
        }
        callback()
      },
      checkPhone(rule,value,callback){

        if(!VerifyPhone(value)){
          callback(new Error('请输入正确电话'));
        }
        callback()
      },
      checkIDCard(rule,value,callback){
        if(!VerifyIDCard(value)){
          callback(new Error('请输入正确身份证'));
        }
        callback()
      },
      //同游开关
      tySwich(){
        var that = this;
        var flag = this.sfty;
        if(flag){
          that.model.ykxm = that.model.lxrxm;
          that.model.ykdh = that.model.lxrsjh;
          that.model.yksfzh =that.model.sfzh ;
        }else{
          that.model.ykxm = that.model.ykdh=that.model.yksfzh='';

        }

      },



      save(){
        var that = this;
        var name = this.model.dyzh,
          password=this.model.mm,
          realName=this.model.dyxm,
          phone=this.model.dydh,
          IDCard=this.model.dysfzh;
        $.ajax({
          url:address.url+address.addUser,
          type:'post',
          data:{
            name:name,
            password:password,
            realName:realName,
            phone:phone,
            IDCard:IDCard,
            sysRoleId:4,
            createBy:Cookies.get('id'),
            token:Cookies.get('token')
          }
        }).then(res=>{

          if(200 == res.CODE){
            MSG.success(res.MSG);
            that.$router.go('-1');
          }else{
            MSG.error(res.MSG)
          }


        })
      },
      goback(){
        this.$router.go('-1');
      },
      getFxsList(){
        var that = this;
        service({
          url:address.getDistributorList,
        }).then(res=>{
          var arr = res.distributorList;
          that.fxslist = arr.map(ele=>{
            return {
              name:`${ele.name}(${ele.unitName})`,
              val:ele.id
            }
          })


        })
      }
    },
    created() {
      this.getFxsList();
    },
    computed:{
      items(){
        var that = this;
        return [
          {
            span:24,
            label:'分销商',
            prop:'fxs',
            type:'text',
            holder:'请选择',
            options:that.fxslist
          },
          {
            span:24,
            label:'联系人姓名',
            prop:'lxrxm',
            type:'text',
            holder:'请输入联系人姓名'
          },

          {
            span:24,
            label:'联系人手机号',
            prop:'lxrsjh',
            type:'text',
            holder:'请输入联系人手机号'
          },
          {
            span:24,
            label:'身份证号',
            prop:'sfzh',
            type:'text',
            holder:'请输入身份证号'
          },
          {
            span:24,
            label:'联系人邮箱',
            prop:'lxryx',
            type:'text',
            holder:'请输入联系人邮箱'
          },
          {
            span:24,
            label:'备注',
            prop:'bz',
            type:'textarea',
            holder:'请输入备注'
          },


        ]
      },
      items2(){
      function rangeArr() {
        return [...(new Array(30)).keys()]
          .map(ele=>ele+1)
          .map(ele=>{
            return {
              name:ele,
              val:ele
            }
          })

      }


        return [
        {
          span:24,
          label:'游客姓名',
          prop:'ykxm',
          type:'text',
          holder:'请输入游客姓名'
        },
        {
          span:24,
          label:'游客电话',
          prop:'ykdh',
          type:'text',
          holder:'请输入游客电话'
        },
        {
          span:24,
          label:'身份证号',
          prop:'yksfzh',
          type:'text',
          holder:'请输入身份证号'
        },
        {
          span:24,
          label:'车号',
          prop:'ykch',
          type:'text',
          holder:'请选择车号',
          options:rangeArr()
        },
        {
          span:24,
          label:'座位号',
          prop:'ykzwh',
          type:'text',
          holder:'请输入座位号'
        },

      ]},
    }

  }
</script>

<style lang="scss" module>




</style>
