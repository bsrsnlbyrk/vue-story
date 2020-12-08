<template>
  <div class="story" @click="openStory">
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
  computed: {
    coverPhoto() {
      return `https://img.piri.net/mnresize/113/-${this.story.coverPhotoPath}`;
    }
  },
  methods: {
    openStory() {
      this.$eventHub.$emit("open_story", this.story);
    }
  }
};
</script>
<style scoped>
.story {
  cursor: pointer;
  margin-right: 5px;
}
.story:first-child {
  margin-left: 5px;
}
.story img {
  width: 100px;
  height: 100px;
  border: 2px solid #333;
  border-radius: 50%;
}
.wrapper {
  display: flex;
}
</style>