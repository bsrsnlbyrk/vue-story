<template>
  <div class="story-info-wrapper">
    <span>{{ title }}</span>
    <br />
    <span>{{ date }}</span>
  </div>
</template>
<script>
export default {
  name: "StoryInfo",
  props: {
    title: {
      type: String,
      required: false,
      default: null,
    },
    date: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>
<style scoped>
.story-info-wrapper {
  color: #fff;
  display: block;
  text-align: left;
}
</style>
