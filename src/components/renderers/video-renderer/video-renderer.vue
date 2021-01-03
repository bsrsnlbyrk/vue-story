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
  data() {
    return {
      videoItem: null
    };
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
        this.$emit("clearParentInterval");
        this.videoItem.play();
      } else {
        this.videoItem.pause();
        this.videoItem.currentTime = 0;
      }
    }
  },
  mounted() {
    this.videoItem = document.getElementById(`video-${this.indexNumber}`);
    this.videoItem.onloadedmetadata = function() {
      this.__vue__.$emit("setDurationData", this.duration);
    };
    this.videoItem.onended = function() {
      this.__vue__.$emit("slideNext");
    };

    if (this.activeVideoItem) {
      this.$emit("clearParentInterval");
      this.videoItem.play();
    } else {
      this.videoItem.pause();
      this.videoItem.currentTime = 0;
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