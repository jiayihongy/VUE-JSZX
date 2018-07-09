<template>
  <div>
    <Table border :columns="header" :data="data" ref="exportable"></Table>
    <slot>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pagecf.count || 10"
                :current="pagecf.pageNumber || 1"
                @on-change="changePage"
                @on-page-size-change="changePageSize"
                show-elevator
                show-total
                show-sizer
                :transfer="conf.transfer"
                :placement="conf.placement"
                :page-size-opts="[10,20,30,40]"
                :page-size="pagecf.pageSize"
          ></Page>
        </div>
      </div>
    </slot>

  </div>
</template>

<script>
    export default {
        name: "commen-table",
      data () {
        return {


        }
      },
        props:{
          pagecf:'',
          conf:'',
         header:'',
         data:''
      },
        methods:{

          changePage (num) {
            this.$emit('setP',num)
          },
          changePageSize(num){
            this.$emit('setPS',num)
          }
        },
      mounted(){

      }
    }
</script>

<style scoped>

</style>
