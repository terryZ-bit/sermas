<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  mounted: function () {
    //此方法刷新页面时也会执行
    window.addEventListener('beforeunload',()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    });
  },
}
</script>

<style lang="less" scoped>
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,SimSun,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

}
</style>
