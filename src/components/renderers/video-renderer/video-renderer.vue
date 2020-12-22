<template>
  <video :src="videoSrc" autoplay class="story-item" :id="`video-${indexNumber}`"></video>
</template>
<script>
export default {
  name: "video-renderer",
  props: {
    item: {
      type: Object,
      required: true
    },
    parentInterval: {
      type: Number,
      required: false
    },
    indexNumber: {
      type: Number,
      required: true
    }
  },
  computed: {
    videoSrc() {
      return `https://image.piri.net${this.item.filePath}`;
    }
  },
  mounted() {
    clearInterval(this.parentInterval);
    const videoItem = document.getElementById(`video-${this.indexNumber}`);
    videoItem.onloadedmetadata = function() {
      console.log(this.__vue__.registerVideoIntervalEmit);
      // this.__vue__.registerVideoIntervalEmit(this.duration)
    };
  },
  methods: {
    registerVideoIntervalEmit(duration) {
      this.$emit('registerVideoInterval', duration);
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