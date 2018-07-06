
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="目的地添加">
        <cform :Config="config" :Items="items" :Model="model">
          <Col slot="uploadModule" span="24">
            <cupload @urlpath="getUrlPath"></cupload>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="success" icon="filing" @click="saveTarget">保存目的地</Button>
            </FormItem>
          </Col>
        </cform>
      </cpanel>

      <cpanel title="目的地列表">

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
    name: "targetManage",
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
          mddmc: '',

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
            title: '目的地',
            key: 'endPlace'
          },
          {
            title: '新建时间',
            key: 'createTime'
          },
          {
            title: '目的地图片',
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
                    type: 'error',
                    size: 'small',
                    icon:'close'
                  },
                  style: {
                    // marginLeft:'-5px'
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
      saveTarget(){
        var that = this;
        var pic = this.AdUrlPath;
        var endPlace = this.model.mddmc;
        if(pic&&endPlace){
          service({
            url:address.addEndPlace,
            data:{
              pic:pic,
              endPlace:endPlace,
            }
          }).then(res=>{
            msg.success('保存成功！');
            that.getAccounts();
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
          content:'是否确认删除该目的地',
          onOk(){
            axios({
              transformRequest: [function (data) {
                data = Qs.stringify(data);
                return data;
              }],
              headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
              url:address.url+address.deleteEndPlace,
              method:'post',
              data:{
                id:rid,
                token:Cookies.get('token')
              }
            }).then(res=>{
              var data = res.data;
              if(200 == data.CODE){
                msg.success(data.MSG);
                that.getAccounts();
              }else{
                msg.error(data.MSG)
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
          url: address.getEndPlace,
          data: {

          }

        }).then(function (res) {
          console.log(res)
          var arr = []
          var users = res.endPlaceList;
          users.forEach(function (ele) {
            var obj = {
              createTime:ele.createTime,
              endPlace:ele.endPlace,
              pic:ele.pic,
              id:ele.id
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
            label: '目的地名称',
            prop: 'mddmc',
            type: 'text',
            holder: '请输入需要增加的目的地的名称'
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
