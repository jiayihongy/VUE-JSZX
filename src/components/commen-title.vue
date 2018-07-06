<template>
    <div :class="[$style.heading]">

      <Row>
        <Col span="16">
          {{title}}
        </Col>
        <Col span="8">
          <slot></slot>
        </Col>
      </Row>
    </div>
</template>

<script>
    export default {
        name: "commen-title",
        props:{
          title:'',
        }
    }
</script>

<style module>
  .heading{
    padding: 10px 15px;
    border-bottom: 1px solid transparent;
    color: #fff;
    background-color: #495060;
    font-size: 16px;
    font-family: "microsoft yahei";
    font-weight: bold;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
</style>
