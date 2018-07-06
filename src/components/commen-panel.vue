<template>
    <div :class="$style.wrap">
        <slot name="ctitle">
          <ctitle :title="title">
            
          </ctitle>
        </slot>

        <div :class="$style.content">
          <slot></slot>
        </div>
    </div>
</template>

<script>
    import Ctitle from '@/components/commen-title'

    export default {
        name: "commen-wrap",
        components:{Ctitle},
        props:{
          title:''
        }
    }
</script>

<style lang="scss" module>
  .wrap{
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-bottom: 10px;
  }

  .content{
    padding: 10px;
  }
</style>
