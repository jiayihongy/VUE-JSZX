<template>
  <div class="updateguide">
    <cwrap>
      <cpanel>
        <div slot="ctitle">
          <ctitle title="修改导游和车辆信息">
            <div>
              <Row>
                <Col span="6" offset="18">
                  <Button type="primary" icon="plus-round" long @click="addItem">增加</Button>
                </Col>
              </Row>
            </div>
          </ctitle>
        </div>

          <Card v-for="(group,idx) in model" :key="idx" style="margin-bottom: 5px">
            <Row style="margin-bottom: 10px">
              <Col span="24" style="text-align: center">
                <Tag color="blue">{{idx+1}}号导游</Tag>
                <Tag closable color="red" @on-close="delItem(idx)">删除</Tag>
              </Col>
            </Row>
            <div v-for="(item,index) in group.items" :key="item.label" style="padding-bottom: 5px">
              <Row>
                <Col span="2">
                  <Badge dot>
                    <span style="line-height: 32px">{{item.label}}</span>
                  </Badge>
                </Col>
                <Col span="22">
                  <Select v-model="item.model" :placeholder="item.holder" v-if="item.options">
                    <Option v-for="(option,num) in item.options" :key="num" :value="option.val">{{option.name}}</Option>
                  </Select>
                  <Input v-else v-model="item.model" :type="item.type" :placeholder="item.holder"></Input>
                </Col>
              </Row>
            </div>
          </Card>




        <!--提交按钮-->
        <Row style="margin-top: 20px">
          <Col span="24">
            <div style="float: right">
              <Button type="primary" :disabled="isDisabed" @click="save">保存</Button>
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
  import {VerifyNumber, VerifyPhone, VerifyIDCard} from "../../../utils/tools";
  import {goBack} from "../../../assets/js/commonMudle";

  export default {
    name: "updateGuide",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel},
    mixins: [goBack],
    data() {


      return {
        isDisabed: true,//禁用保存按钮
        /*form表单参数*/

        model: [],


        /*表格参数*/


      }
    },
    watch: {
      model: {
        handler(params, oldVal) {
          function flatten(arr){
            var res = [];
            for(var i=0;i<arr.length;i++){
              if(Array.isArray(arr[i])){
                res = res.concat(flatten(arr[i]));
              }else{
                res.push(arr[i]);
              }
            }
            return res;
          }



          var that = this;

          var arr1 = this.model.map(ele=>ele.items.map(ele=>ele.model));
          var arr = flatten(arr1);
          if(!arr.every(ele=>ele)){
            that.isDisabed = true;
            return false
          }else {
            that.isDisabed = false
          }


        },
        deep: true
      }

    },
    methods: {

      save() {

      },
      delItem(idx){
        this.model.splice(idx,1);
      },
      addItem() {
        var obj ={

          items: [
            {
              label: '指配导游',
              type: 'text',
              holder: '请选择',
              model: '',
              options:[
                {
                  name:'asd',
                  val:1
                }
              ]
            },
            {
              label: '分配金额',
              type: 'text',
              holder: '请输入分配金额',
              model: 'asdf',
            },
            {
              label: '车号',
              type: 'text',
              holder: '请选择车号',
              model: '',
              options:[
                {
                  name:'asd',
                  val:1
                }
              ]
            },
            {
              label: '车牌号',
              type: 'text',
              holder: '请输入车牌号',
              model: '',
            },
            {
              label: '驾驶员姓名',
              type: 'text',
              holder: '请输入驾驶员姓名',
              model: '',
            },
            {
              label: '驾驶员电话',
              type: 'text',
              holder: '请输入驾驶员电话',
              model: '',
            },
          ]
        }
        this.model.push(obj)
      }


    },
    created() {

    },

  }
</script>

<style lang="scss">
  .updateguide {
    .ivu-badge-dot {
      top: 6px;
      right: -6px;
      height: 4px;
      width: 4px;
    }
  }


</style>
