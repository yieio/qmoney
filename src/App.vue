<template>
  <div id="app"> 
    <QIndex />
  </div>
</template>

<script>
import QIndex from './components/Index.vue' 

export default {
  name: 'App',
  components: {
    QIndex
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50; 
  background:#fafafa;
  height:100%;
}
</style>
