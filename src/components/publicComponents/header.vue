<template>
  <div id="public-header">
    <div class="logo-area">
      <img class="logo" src="../../../public/image/logo.png"/>
    </div>

    <div class="header-black"/>

    <div class="header-button">
      <div  v-for="button in button_list" :key="button" id = "button_list">
        <el-button size="mini" type="text">{{button}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "publicHeader",

  data () {
    return {
    }
  },

  props: [
      "button_list",
  ]
}
</script>

<style lang="less">

#public-header {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;

  .logo-area {
    display: flex;
    flex-direction: row;
    margin: auto;
    width: 15%;

    .logo {
      width: 70px;
      height: 25px;
    }
  }

  .header-black {
    display: flex;
    align-items: center;
    width: 60%;
  }

  .header-button {
    flex-direction: row;
    width: 25%;
    margin: auto;

    .el-button {
      float: right;
      margin-left: 10px;
      color: #4267a2;
      font-size: 85%;
    }
  }
}
</style>