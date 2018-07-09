<template>
  <div>
    <cwrap>
      <cpanel title="添加用户订单">
        <Card>
          <cform :Config="config" :Items="items" :Model="model" :Rules="formRules" >
            <div></div>
          </cform>
        </Card>


        <Card style="margin-top: 20px">
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
  import {VerifyNumber,VerifyPhone,VerifyIDCard} from "../../../utils/tools";

  export default {
    name: "adminAddUserOrder",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
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
          labelW:120,
          labelP:'right',
          // isinline:true
        },
        model:{
          dyzh:'',
          mm:'',
          dyxm:'',
          dydh:'',
          dysfzh:'',
        },
        items:[
          {
            span:24,
            label:'分销商',
            prop:'fxs',
            type:'text',
            holder:'请选择'
          },
          {
            span:24,
            label:'联系人姓名',
            prop:'mm',
            type:'text',
            holder:'请输入联系人姓名'
          },

          {
            span:24,
            label:'联系人手机号',
            prop:'dyxm',
            type:'text',
            holder:'请输入联系人手机号'
          },
          {
            span:24,
            label:'身份证号',
            prop:'dydh',
            type:'text',
            holder:'请输入身份证号'
          },
          {
            span:24,
            label:'联系人邮箱',
            prop:'dysfzh',
            type:'text',
            holder:'请输入联系人邮箱'
          },

        ],
        items2:[
          {
            span:24,
            label:'游客姓名',
            prop:'fxs',
            type:'text',
            holder:'请输入游客姓名'
          },
          {
            span:24,
            label:'游客电话',
            prop:'fxs',
            type:'text',
            holder:'请输入游客电话'
          },
          {
            span:24,
            label:'身份证号',
            prop:'fxs',
            type:'text',
            holder:'请输入身份证号'
          },
          {
            span:24,
            label:'车号',
            prop:'fxs',
            type:'text',
            holder:'请选择车号'
          },
          {
            span:24,
            label:'座位号',
            prop:'fxs',
            type:'text',
            holder:'请输入座位号'
          },

        ],
        /*表格参数*/



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

      getSonData(data){


      },

      getAccounts(conf={}) {

      },


    },
    created() {

    },

  }
</script>

<style lang="scss" module>




</style>
