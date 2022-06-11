<template>
  <el-tooltip
    :content="title"
    placement="top"
  >
    <el-button
      v-bind="$attrs"
      v-on="$listeners"
    />
  </el-tooltip>
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
