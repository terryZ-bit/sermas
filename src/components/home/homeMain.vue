<template>
  <div id="home-main">

    <!-- 欢迎界面显示控制台    -->
    <ctrl-lab v-show="is_ctrl_show"></ctrl-lab>
  </div>
</template>

<script>
import CtrlLab from "../ctrlLab/ctrlLab";
export default {
  name: "homeMain",
  components: {CtrlLab},
  data() {
    return {
      is_ctrl_show: true
    }
  }
}
</script>

<style lang="less" scoped>

</style>