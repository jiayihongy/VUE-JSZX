
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="修改分销商或供应商">
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
  import {VerifyNumber,VerifyPhone} from "../../../utils/tools";

  export default {
    name: "updateBusiness",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
        userId:this.$route.query.userId,
        isDisabed:true,//禁用保存按钮
        /*form表单参数*/
        formRules:{
          qyzh: [
            { required: true,  trigger: 'change',validator:this.checkNumber},
          ],
          qylxrdh: [
            { required: true,  trigger: 'change',validator:this.checkPhone},
          ],
          qysh: [
            { required: true,  trigger: 'change',validator:this.checkNumber},
          ]
        },//表单验证
        config:{
          labelW:120,
          labelP:'right',
          // isinline:true
        },
        model:{
          qyzh:'',
          qysf:'',
          qysfid:'',
          qymc:'',
          qylxrxm:'',
          qylxrdh:'',
          qysh:''
        },
        items:[
          {
            span:24,
            label:'企业账号',
            prop:'qyzh',
            type:'text',
            holder:'请输入企业账号'
          },
          {
            span:24,
            label:'企业身份',
            prop:'qysf',
            type:'text',
            holder:'请选择',
            disabled:true

          },

          {
            span:24,
            label:'企业名称',
            prop:'qymc',
            type:'text',
            holder:'请输入企业名称',
          },
          {
            span:24,
            label:'企业联系人姓名',
            prop:'qylxrxm',
            type:'text',
            holder:'请输入企业联系人姓名'
          },
          {
            span:24,
            label:'企业联系人电话',
            prop:'qylxrdh',
            type:'text',
            holder:'请输入企业联系人电话'
          },
          {
            span:24,
            label:'企业税号',
            prop:'qysh',
            type:'text',
            holder:'请输入企业税号'
          }
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
      save(){
        var that = this;
        var name = that.model.qyzh,
          unitName=that.model.qymc,
          contactName =that.model.qylxrxm,
          contactPhone=that.model.qylxrdh,
          ein=that.model.qysh,
          sysRoleId= that.model.qysfid;
        $.ajax({
          url:address.url+address.updateUser,
          type:'post',
          data:{
            id:that.userId,
            name:name,
            unitName:unitName,
            contactName:contactName,
            contactPhone:contactPhone,
            ein:ein,
            sysRoleId:sysRoleId,
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
          that.model.qyzh = user.name;
          that.model.qysf = user.sysRoleId==2?'供应商':'分销商';
          that.model.qymc = user.unitName;
          that.model.qylxrxm = user.contactName;
          that.model.qylxrdh = user.contactPhone;
          that.model.qysh = user.ein;
          //单独赋值身份id
          that.model.qysfid = user.sysRoleId
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
