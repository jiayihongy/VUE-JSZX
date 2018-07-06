
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="修改导游">
        <cform :Config="config" :Items="items" :Model="model" :Rules="formRules" @lauchdata="getSonData">

          <Col span="24">
            <FormItem>
              <Button type="primary" :disabled="isDisabed"  @click="save">保存</Button>

              <Button type="error" style="margin-left: 8px" @click="goback">取消</Button>
            </FormItem>
          </Col>
        </cform>
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
  import MSG from '@/assets/js/message'
  import {VerifyNumber,VerifyPhone,VerifyIDCard} from "../../../utils/tools";

  export default {
    name: "updateUser",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
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
          labelW:120,
          labelP:'right',
          // isinline:true
        },
        model:{
          dyzh:'',
          dyxm:'',
          dydh:'',
          dysfzh:'',
        },
        items:[
          {
            span:24,
            label:'导游账号',
            prop:'dyzh',
            type:'text',
            holder:'请输入导游账号'
          },


          {
            span:24,
            label:'导游姓名',
            prop:'dyxm',
            type:'text',
            holder:'请输入导游姓名'
          },
          {
            span:24,
            label:'导游电话',
            prop:'dydh',
            type:'text',
            holder:'请输入导游电话'
          },
          {
            span:24,
            label:'导游身份证号',
            prop:'dysfzh',
            type:'text',
            holder:'请输入导游身份证号'
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
          realName=this.model.dyxm,
          phone=this.model.dydh,
          IDCard=this.model.dysfzh;
        $.ajax({
          url:address.url+address.updateUser,
          type:'post',
          data:{
            name:name,
            realName:realName,
            phone:phone,
            IDCard:IDCard,
            id:that.userId,
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
      getInfo(){
        var that = this;

        service({
          url:address.getUpdateUser,
          data:{
            id:that.userId
          }
        }).then(res=>{

            var user=res.editUser;
            that.model.dyzh = user.name;
            that.model.dyxm = user.realName;
            that.model.dydh = user.phone;
            that.model.dysfzh = user.IDCard;

        })
      }



    },
    created() {
      this.getInfo()
    },

  }
</script>

<style lang="scss" module>




</style>
