<template>
  <div class="full-screen-wrapper">
    <button @click="closeStory">Close</button>
  </div>
</template>
<script>
export default {
  name: "full-screen-story",
  props: {
    stories: {
      type: Array,
      required: true
    },
    viewingStory: {
      type: Object,
      required: true
    }
  },
  methods: {
    closeStory() {
      this.$eventHub.$emit("close_story");
    }
  }
};
</script>
<style scoped>
.full-screen-wrapper {
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: #333;
}
</style>