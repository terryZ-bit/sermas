<template>
  <div id="ctrl-lab">
    <div class="role_welcome_title">
      <h1 class="ctrl-main-h1">您好！
        <span style="color: #698fd9">{{role_name}}</span>
      </h1>
    </div>

    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ctrlLab",

  data() {
    return {
      role_name: localStorage.getItem("role_name"),
    }
  }
}
</script>

<style lang="less" scoped>
#ctrl-lab {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .ctrl-main-h1 {
    float: left;
  }
}
</style>