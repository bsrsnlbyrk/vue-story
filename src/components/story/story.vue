<template>
  <div class="story" :ref="story.id">
    <img :src="coverPhoto" />
  </div>
</template>

<script>
export default {
  name: "story",
  props: {
    story: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isStoryOpened: false
    };
  },
  computed: {
    coverPhoto() {
      return `https://img.piri.net/mnresize/113/-${this.story.coverPhotoPath}`;
    }
  },
  mounted() {
    this.$refs[this.story.id].addEventListener("click", () => {
      this.$eventHub.$emit("open_story", this.story);
    });
  }
};
</script>
<style scoped>
.story {
  cursor: pointer;
}
.story img {
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  border-radius: 50%;
}
</style>