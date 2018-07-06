<template>
  <div id="app">

    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){

  }
}
</script>

<style>
  ::-webkit-scrollbar{
    display:none;
  }
  html,body{
    height: 100%;
    width: 100%;
  }
  #app{
    height: inherit;
  }
</style>
