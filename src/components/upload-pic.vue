<template>
  <div>




    <Form method="post"
          enctype="multipart/form-data"
          :label-width="120"
          ref="cform"
          label-position="right">
      <FormItem label="请上传图片">

        <Upload
          ref="cupload"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :before-upload="handleBeforeUpload"
          type="drag"
          action="/"
          style="display: inline-block;width:58px;">
          <div style="width: 58px;height:58px;line-height: 58px;">
            <div v-if="isloading" class="loadingwrap">
              <Spin fix size="large"></Spin>
            </div>
            <Icon v-if="isget" type="camera" size="20"></Icon>
            <img v-if="imgblock" :src="imgsrc" alt="" height="100%">
          </div>
        </Upload>
      </FormItem>
    </Form>
  </div>
</template>
<script>
  import {address} from "../api/api";
  import msg from '@/assets/js/message';
  export default {
    data(){
      return {
        isget:true,
        imgsrc:'',
        imgblock:false,
        isloading:false
      }
    },
    methods:{
      handleBeforeUpload(e){
        var that = this;
        var form = this.$refs.cform.$el;
        var input = this.$refs.cupload.$refs.input
        $(input).attr('name','uploadFile');


        var options = {
          url: address.url+address.uploadFile,
          type: "post",
          dataType: "json",
          beforeSend: function(){
            that.isloading = true
          },
          success: function(res) {
            that.isloading = false
            if(200 == res.CODE){
              msg.success('上传成功');

              let path = res.DATA.imgPath;
              that.$emit('urlpath',path);
              that.imgsrc = address.url+path;
              that.imgblock = true;
              that.isget = false;

            }else{
              msg.error(res.MSG);
            }
          }
        };
        $(form).ajaxSubmit(options);




        return false
      },


    },
    mounted(){

    }

  }
</script>
<style>
  .loadingwrap{
    display: inline-block;
    position: relative;
    width: 100%;
    height: 100%;
  }
  .ivu-spin-fix .ivu-spin-main{
    top: 68%;
  }
</style>

