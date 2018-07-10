
<template>
  <div class="updateOrder">
    <cwrap>
      <cpanel title="修改发班计划">
        <Row style="margin-top: 20px;">
          <Col span="24">
            <h2>
              <Icon type="wand" style="color: #f16543"></Icon>
              出发日期</h2>
          </Col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="24">
            <Badge dot style="margin-right: 10px" :class="[model.cfrq?blue:'']">
              <span>出发日期</span>
            </Badge>

            <DatePicker type="date"
                        :editable="false"
                        multiple
                        v-model="model.cfrq"
                        readonly
                        style="width: 500px"></DatePicker>
          </Col>
        </Row>
        <Row style="margin-top: 30px;">
          <Col span="24">
            <h2>
              <Icon type="wand" style="color: #f16543"></Icon>
              C端游客类型价格</h2>
          </Col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="12" style="padding-right: 10px">
            <Badge dot :class="[model.crlsj?blue:'']">
              <p>成人零售价</p>
            </Badge>
            <Slider v-model="model.crlsj" show-input :max="max"></Slider>
          </Col>
          <Col span="12" style="padding-left: 10px;">
            <Badge dot :class="[model.etlsj?blue:'']">
              <p>儿童团零售价</p>
            </Badge>
            <Slider v-model="model.etlsj" show-input :max="max"></Slider>
          </Col>
        </Row>
        <Row style="margin-top: 30px;" v-if="model.formList.length >0">
          <Col span="24">
            <h2>
              <Icon type="wand" style="color: #f16543"></Icon>
              B端游客类型价格</h2>
          </Col>
        </Row>
        <Row style="margin-top: 10px;" v-for="item in model.formList" :key="item.priceTypeId">
          <Col span="3">
            <p style="height: 32px;line-height: 32px">{{item.priceType}}</p>
          </Col>
          <Col span="8">
            <Input v-model="item.price1"  placeholder="请输入零售价">
            <!--<span slot="prepend">零售价</span>-->
            <Badge dot slot="prepend" :class="[item.price1?blue:'']">
              <p>零售价</p>
            </Badge>
            </Input>
          </Col>
          <Col span="8" style="padding-left: 10px;">
            <Input v-model="item.price"  placeholder="请输入结算价价">
            <Badge dot slot="prepend" :class="[item.price?blue:'']">
              <p>结算价</p>
            </Badge>
            </Input>
          </Col>
        </Row>

        <Row style="margin-top: 30px;">
          <Col span="24">
            <h2>
              <Icon type="wand" style="color: #f16543"></Icon>
              退团扣费以及其他说明</h2>
          </Col>
        </Row>
        <Row style="margin-top: 10px;">
          <Col span="16" style="padding-right: 10px">
            <Input v-model="qtsm" type="textarea" autosize placeholder="请输入订单的退团扣费以及其他说明"></Input>
          </Col>
        </Row>

        <!--按钮组-->
        <Row>
          <Col span="24">
            <div style="float: right">
              <Button type="primary" :disabled="isDisabed"  @click="save">保存</Button>

              <Button type="error" style="margin-left: 8px" @click="goBack">取消</Button>
            </div>

          </Col>
        </Row>

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
  import {goBack} from "../../../assets/js/commonMudle";
  import service from "../../../api/fetch";

  export default {
    name: "updateOrder",
    mixins:[goBack],
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    data() {


      return {
        //样式绑定
        blue:'blue',

        //query参数,
        userId:this.$route.query.userId,
        state:this.$route.query.state,

        isDisabed:true,//禁用保存按钮

        max:10000,//滑块最大值

        //数据模型
        model:{
          cfrq:'',
          crlsj:0,
          etlsj:0,
          formList:[] //动态获取B端游客类型并建设模型
        },
        qtsm:'', //其他说明（非必填）





      }
    },
    watch:{
      model:{
        handler(params, oldVal){
          var that = this;
          var obj = {};
          for(let key in params){
            if(!Array.isArray(params[key])){
              obj[key] = params[key]
            }
          }
          var arr = [obj,...params.formList];

          arr.forEach(ele=>{
            for(var key in ele){
              if(!ele[key]){
                that.isDisabed = true;
                return false
              }
            }
            that.isDisabed = false
          })



        },
        deep:true
      },


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
        $.ajax({
          url:address.url+address.addOrder,
          type:'post',
          data:{
            id:that.userId,
            date:that.model.cfrq,
            adultPrice:that.model.crlsj,
            childPrice:that.model.etlsj,
            priceList:JSON.stringify(that.model.formList),
            quitRemarks:'',
            token:Cookies.get('token')
          }
        }).then(res=>{
          if(res.CODE==200){
            MSG.success(res.MSG);
            that.$router.go('-1');
          }else{
            MSG.error(res.MSG)
          }
        })
      },




      getPriceInfo() {
        var that = this;

        service({
          url:address.getOrder,
          data:{
            id:that.userId
          }
        }).then(res=>{
         var info = res.orderMap.publishInfo;

          that.model.cfrq = info.date;
          that.model.crlsj = info.adultPrice;
          that.model.etlsj = info.childPrice;
          that.qtsm = info.quitRemarks;

        })
      },


    },
    created() {
      this.getPriceInfo()
    },

  }
</script>

<style lang="scss">
  .updateOrder{
    .ivu-badge-dot{
      height: 4px;
      width: 4px;
    }
    .blue .ivu-badge-dot{
      background: #2d8cf0;
    }

  }



</style>
