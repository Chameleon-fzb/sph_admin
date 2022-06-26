<template>
  <a :title="title">
    <el-button
      v-bind="$attrs"
      v-on="$listeners"
    />
  </a>
</template>
<script>
export default {
  name: 'HintBtn',
  props: {
    title: {
      type: String,
      required: true
    }
  }
}
</script>
<style scoped>
a {
  margin: 0 5px;
}
</style>
