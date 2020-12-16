<template>
  <div class="story-info-wrapper">
    <span>{{ title }}</span>
    <br />
    <span>{{ date }}</span>
  </div>
</template>
<script>
export default {
  name: "story-info",
  props: {
    title: {
      type: String,
      required: false,
      default: null
    },
    date: {
      type: String,
      required: false,
      default: null
    }
  }
};
</script>
<style scoped>
.story-info-wrapper {
    color: #fff;
    display: block;
}
</style>