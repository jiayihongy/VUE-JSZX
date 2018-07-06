
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="添加标签">
        <cform :Config="config" :Items="items" :Model="model">
          <Col slot="uploadModule" span="24">
            <cupload @urlpath="getUrlPath"></cupload>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="success" icon="filing" @click="saveTag">保存标签</Button>
            </FormItem>
          </Col>
        </cform>
      </cpanel>

      <cpanel title="标签列表">

        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
        >
          <div></div>
        </ctabel>

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
  import Cupload from '@/components/upload-pic'
  import Cookies from 'js-cookie'
  import axios from 'axios'
  import Qs from 'qs';
  import msg from '@/assets/js/message'

  export default {
    name: "tagManage",
    components: {Ctitle, Cpanel, Cwrap, Cform, Ctabel,Cupload},
    data() {


      return {
        AdUrlPath:'',
        visible:'',
        /*form表单参数*/
        config: {
          labelW: 120,
          labelP: 'right',
          // isinline:true
        },
        model: {
          bqmc: '',

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
            title: '标签名称',
            key: 'routeSort'
          },
          {
            title: '标签图片',
            key: 'pic',
            align:'center',
            render: (h, params) => {
              return h('div',{
                on:{
                  click:()=>{
                    this.popModal(address.url+params.row.pic)
                  }
                }
              },[

                h('Avatar', {
                  attrs:{
                    src:address.url+params.row.pic
                  },
                  props: {
                    shape:"square",
                    size:'large'
                  },
                  style: {
                    // marginLeft:'-5px'
                    // cursor:'pointer'
                  },
                  on: {
                    click: () => {

                    }
                  }
                },'删除'),
              ]);
            }
          },

          {
            title: '操作',
            key: 'action',
            // width: 270,
            align: 'center',
            render: (h, params) => {
              return h('div',{
                style:{

                }
              }, [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon:'qr-scanner'
                  },
                  style: {
                    // marginLeft:'-5px'
                  },
                  on: {
                    click: () => {

                    }
                  }
                }, '显示'),

                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon:'close'
                  },
                  style: {
                    marginLeft:'5px'
                  },
                  on: {
                    click: () => {
                      this.delectRow(params.row.id)
                    }
                  }
                }, '删除'),
              ]);
            }
          },




        ],
        tdata: [],


      }
    },
    computed: {},
    methods: {
      saveTag(){
        var that = this;
        var pic = this.AdUrlPath;
        var endPlace = this.model.bqmc;
        if(pic&&endPlace){
          $.ajax({
            url:address.url+address.addLabel,
            type:'post',
            data:{
              token:Cookies.get('token'),
              image:pic,
              routeSort:endPlace,
            }
          }).then(res=>{
            if(res.CODE == 200){
              msg.success('保存成功！');
              that.getAccounts();
            }else{
              msg.error(res.MSG)
            }
            console.log(res)
          })
        }else {
          msg.error('请把信息填写完整！')
        }
      },
      getUrlPath(data){
        this.AdUrlPath = data;
      },

      delectRow(rid){
        var that = this;
        this.$Modal.confirm({
          content:'是否确认删除该标签',
          onOk(){
            $.ajax({
              url:address.url+address.deleteLabel,
              type:'post',
              data:{
                routeSortId:rid,
                token:Cookies.get('token')
              }
            }).then(res=>{


              if(200 == res.CODE){
                msg.success(res.MSG);
                that.getAccounts();
              }else{
                msg.error(res.MSG)
              }
            })
          }
        })
      },
      popModal(src){
        this.$Modal.info({
          maskClosable:true,
          render: (h, params) => {
            return h('div',{
              style:{

              }
            }, [

              h('img', {
                attrs:{
                  src:src
                },
                props: {

                },
                style: {
                  width:'100%'
                },

              }, '删除'),
            ]);
          }
        })
      },

      getAccounts(conf = {}) {
        var that = this;
        service({
          url: address.getLabel,
          data: {

          }

        }).then(function (res) {

          var arr = []
          var users = res.labelList;
          users.forEach(function (ele) {
            var obj = {
              routeSort:ele.routeSort,
              pic:ele.image,
              id:ele.routeSortId
            }
            arr.push(obj)
          })
          that.tdata = arr;
        })
      },

    },
    created() {

      this.getAccounts();
    },
    computed: {
      items() {
        return [

          {
            span: 12,
            label: '标签名称',
            prop: 'bqmc',
            type: 'text',
            holder: '请输入需要增加的标签的名称'
          },

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
