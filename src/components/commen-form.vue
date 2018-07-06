<template>
  <Form ref="formCustom" :model="Model" :rules="Rules" :label-width="Config.labelW || 100" :label-position="Config.labelP || 'left'" :inline="Config.isinline || false">
    <Row>
      <Col  v-for="(item,index) in Items" :key="index" :span="item.span">
        <FormItem :label="item.label" :prop="item.prop">
          <Select v-model="Model[item.prop]" :placeholder="item.holder" v-if="item.options">
            <Option v-for="(option,num) in item.options" :key="num" :value="option.val">{{option.name}}</Option>
          </Select>
          <DatePicker v-else-if="item.type == 'date'" :type="item.type" :placeholder="item.holder" v-model="Model[item.prop]" format="yyyy-MM-dd"  @on-change="changeDate" :data-date="item.prop" ref="mydate"></DatePicker>

          <Input v-else :type="item.type" :disabled="item.disabled" v-model="Model[item.prop]" :placeholder="item.holder"></Input>
        </FormItem>
      </Col>
      <slot name="uploadModule">

      </slot>
      <slot name="otherBtn">

      </slot>
      <slot name="checkBox">

      </slot>
    </Row>

    <Row>
      <slot>
        <Col span="24">
          <FormItem>
            <Button type="primary" @click="handleSubmit(Model)">搜索</Button>
            <Button type="ghost" @click="handleReset" style="margin-left: 8px">清空</Button>
          </FormItem>
        </Col>
      </slot>
    </Row>

  </Form>
</template>

<script>
  import service from '@/api/fetch'
    export default {
        name: "commen-form",
        props:{
          Config:'',
          Items:'',
          Model:'',
          Rules:''
        },
        data(){
          return {
            date:''
          }
        },
        methods:{
          handleSubmit(data) {
            this.$emit('lauchdata',data)
          },
          handleReset() {
            this.$refs.formCustom.resetFields();
          },
          changeDate(e){
            var ele = this.$refs.mydate[0].$el.getAttribute('data-date');
            this.Model[ele] = e;
          },

        },
        created(){

        }
    }
</script>

<style scoped>

</style>
