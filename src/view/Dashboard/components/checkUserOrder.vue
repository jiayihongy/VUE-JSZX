
<template>
  <div>
    <cwrap>
      <Row style="margin-bottom: 10px">
        <Col span="24">
          <Button type="ghost" @click="goBack">
            <Icon type="chevron-left"></Icon>
            返回
          </Button>
        </Col>
      </Row>
      <cpanel title="线路价格详情">
        <Row style="padding: 20px 0;text-align: center">
          <Col span="8">
            游客类型:{{yklx}}
          </Col>
          <Col span="8">
            零售价:{{lsj}}
          </Col>
          <Col span="8">
            结算价:{{jsj}}
          </Col>
        </Row>
      </cpanel>
      <cpanel title="审核用户订单">
        <Card>
          <cform :Config="config" :Items="items" :Model="model" >
            <div>
              <Row>
                <Col span="24">
                  <span style="display: inline-block;width: 100px">是否同游</span>
                  <i-switch  disabled v-model="sfty">
                    <span slot="open">是</span>
                    <span slot="close">否</span>
                  </i-switch>
                </Col>
              </Row>
            </div>
          </cform>
        </Card>


        <Card style="margin-top: 20px">
          <div style="text-align: center;padding-bottom: 10px">
            <Tag color="green">主要联系人</Tag>
          </div>
          <cform :Config="config" :Items="items2" :Model="model">

            <Col span="24">
              <FormItem>
                <Button type="primary"  @click="agree">审核通过</Button>

                <Button type="error" style="margin-left: 8px" @click="disagree">审核不通过</Button>
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
  import {goBack} from "../../../assets/js/commonMudle";
  import Cookies from 'js-cookie'
  import MSG from '@/assets/js/message'
  import service from '@/api/fetch'
  import {VerifyNumber,VerifyPhone,VerifyIDCard} from "../../../utils/tools";
  import axios from 'axios'

  export default {
    name: "checkUserOrder",
    components:{Ctitle,Cpanel,Cwrap,Cform,Ctabel},
    mixins:[goBack],
    data() {


      return {
        userId:this.$route.query.userId,
        orderId:this.$route.query.orderId,
        /*form表单参数*/
        config:{
          labelW:100,
          labelP:'left',
          // isinline:true
        },
        model:{
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
        yklx:'',
        lsj:'',
        jsj:''
      }
    },
    methods: {



      disagree(){

      },
      agree(){

      },
      getCheckOrderDetail(){
        var that = this;
        axios.all([
          service({
            url:address.getCheckOrderDetail,
            data:{
              id:that.userId
            }
          }),
          service({
            url:address.visitorTypeList,
            data:{
              publishId:that.orderId,
              id:''
            }
          })
        ]).then(res=>{
          var down = res[0];
          var up = res[1]
          var priceTypeList = up.priceTypeList[0];
          that.yklx = priceTypeList.priceType
          that.lsj = priceTypeList.price;
          that.jsj = priceTypeList.price1;

          var touristsList = down.checkOrderDetail.touristsList[0];
          that.model.lxrxm = that.model.ykxm = touristsList.name;
          that.model.lxrsjh = that.model.ykdh = touristsList.phone;
          that.model.sfzh = that.model.yksfzh = touristsList.idCard;
        })

      }
    },
    created() {
      this.getCheckOrderDetail();
    },
    computed:{
      items(){
        var that = this;
        return [

          {
            span:24,
            label:'联系人姓名',
            prop:'lxrxm',
            type:'text',
            holder:'请输入联系人姓名',
            disabled:true
          },

          {
            span:24,
            label:'联系人手机号',
            prop:'lxrsjh',
            type:'text',
            holder:'请输入联系人手机号',
            disabled:true
          },
          {
            span:24,
            label:'身份证号',
            prop:'sfzh',
            type:'text',
            holder:'请输入身份证号',
            disabled:true
          },
          {
            span:24,
            label:'联系人邮箱',
            prop:'lxryx',
            type:'text',
            holder:'请输入联系人邮箱',
            disabled:true
          },
          {
            span:24,
            label:'备注',
            prop:'bz',
            type:'textarea',
            holder:'请输入备注',
            disabled:true
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
            holder:'请输入游客姓名',
            disabled:true
          },
          {
            span:24,
            label:'游客电话',
            prop:'ykdh',
            type:'text',
            holder:'请输入游客电话',
            disabled:true
          },
          {
            span:24,
            label:'身份证号',
            prop:'yksfzh',
            type:'text',
            holder:'请输入身份证号',
            disabled:true
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
