<template>
  <video :src="videoSrc" class="story-item" :id="`video-${indexNumber}`"></video>
</template>
<script>
export default {
  name: "video-renderer",
  props: {
    item: {
      type: Object,
      required: true
    },
    indexNumber: {
      type: Number,
      required: true
    },
    activeIndex: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    videoSrc() {
      return `https://image.piri.net${this.item.filePath}`;
    },
    activeVideoItem() {
      return this.indexNumber === this.activeIndex;
    }
  },
  watch: {
    activeVideoItem(val) {
      if (val) {
        this.$emit('clearParentInterval');
        document.getElementById(`video-${this.indexNumber}`).play();
      } else {
        document.getElementById(`video-${this.indexNumber}`).pause();
      }
    }
  },
  mounted() {
    const videoItem = document.getElementById(`video-${this.indexNumber}`);
    videoItem.onended = function() {
      this.__vue__.$emit('slideNext');
    };
  }
};
</script>
<style>
.story-item {
  width: 100%;
  height: 100%;
}
</style>