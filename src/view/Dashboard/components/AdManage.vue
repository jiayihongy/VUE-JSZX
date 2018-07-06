
<template>
  <div :class="$style.allaccounts">
    <cwrap>
      <cpanel title="广告位添加">
        <cform :Config="config" :Items="items" :Model="model" @lauchdata="getSonData">
          <Col slot="uploadModule" span="24">
              <cupload @urlpath="getUrlPath"></cupload>
          </Col>
          <Col span="24">
            <FormItem>
              <Button type="success" icon="filing" @click="saveAdd">保存广告位</Button>
            </FormItem>
          </Col>
        </cform>
      </cpanel>

      <cpanel title="广告位列表">

        <ctabel
          :conf="tconf"
          :header="theader"
          :data="tdata"
          :pagecf="tpagecf"
          @setPS="setps"
          @setP="setp"
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
    name: "AdManage",
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
          ggwsm: '',
          ggwlj: '',

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
            title: '广告链接',
            key: 'url'
          },
          {
            title: '广告类型',
            key: 'disPlaySite'
          },
          {
            title: '广告图片',
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
      getUrlPath(data){
        this.AdUrlPath = data;
      },
      saveAdd(){
        var that = this;
        var ADurl = this.model.ggwlj;
        var disPlaySite = this.model.ggwsm;
        var picUrl = this.AdUrlPath;
        if(ADurl&&disPlaySite&&picUrl){
          service({
            url:address.addAD,
            data:{
              ADurl:ADurl,
              disPlaySite:disPlaySite,
              picUrl:picUrl
            }
          }).then(res=>{
            msg.success('保存成功！');
            that.getAccounts();
          })
        }else {
          msg.error('请把信息填写完整！')
        }

      },
      delectRow(rid){
        var that = this;
        this.$Modal.confirm({
          content:'是否确认删除该广告',
          onOk(){
            axios({
              transformRequest: [function (data) {
                data = Qs.stringify(data);
                return data;
              }],
              headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},
              url:address.url+address.deleteAD,
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
      getSonData(data) {

        var conf = {
          routeName: data.ggwsm,
          guideName: data.ggwlj,

        }

        this.getAccounts(conf)
      },

      getAccounts(conf = {}) {
        var that = this;
        service({
          url: address.getAD,
          data: {

          }

        }).then(function (res) {
          console.log(res)
          var arr = []
          var count = res.adList.length;
          var users = res.adList;
          users.forEach(function (ele) {
            var obj = {
              url:ele.url,
              disPlaySite:ele.disPlaySite == 3?'微信端广告':'PC端广告',
              pic:ele.pic,
              id:ele.id
            }
            arr.push(obj)
          })
          that.tpagecf.count = count
          that.tdata = arr;
        })
      },
      setps(data) {
        this.tpagecf.pageSize = data;
        this.getAccounts();
      },
      setp(data) {
        this.tpagecf.pageNumber = data;
        this.getAccounts();
      }
    },
    created() {

      this.getAccounts();
    },
    computed: {
      items() {
        return [
          {
            span: 12,
            label: '广告位说明',
            prop: 'ggwsm',
            type: 'text',
            holder: '请选择',
            options:[
              {name:'微信端广告',val:3},
              {name:'PC端广告',val:4},
            ]
          },
          {
            span: 12,
            label: '广告位链接',
            prop: 'ggwlj',
            type: 'text',
            holder: '请输入广告链接的地址'
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
