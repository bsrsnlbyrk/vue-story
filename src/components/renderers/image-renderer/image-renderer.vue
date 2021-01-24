<template>
  <img
    :src="imgSrc"
    :alt="alt"
    class="story-item"
  >
</template>
<script>
export default {
  name: "ImageRenderer",
  props: {
    item: {
      type: Object,
      required: true
    },
    alt: {
      type: String,
      required: false,
      default: "image"
    }
  },
  computed: {
    imgSrc() {
      return `https://img.piri.net${this.item.filePath}`;
    }
  }
};
</script>
<style scoped>
.story-item {
  width: 100%;
  height: 100%;
}
</style>