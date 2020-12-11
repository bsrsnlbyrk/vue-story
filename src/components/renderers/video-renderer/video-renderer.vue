<template>
  <video :src="videoSrc" autoplay class="story-item"></video>
</template>
<script>
export default {
  name: "video-renderer",
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  computed: {
    videoSrc() {
      return `https://image.piri.net${this.item.filePath}`;
    }
  }
};
</script>
<style>
.story-item {
  width: 100%;
  height: 100%;
}
</style>