<template>
  <div class="full-screen-wrapper">
    <button @click="closeStory">Close</button>
    <progress-bar></progress-bar>
    <nav-buttons></nav-buttons>
    <story-list :stories="stories" @changeViewingStory="changeViewingStory"></story-list>
    <story-view :viewingStory="viewingStory"></story-view>
  </div>
</template>
<script>
import StoryList from '../story-list/story-list';
import StoryView from '../story-view/story-view';

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
  components: {
    StoryList,
    StoryView
  },
  data() {
    return {
      viewing: null
    }
  },
  methods: {
    closeStory() {
      this.$eventHub.$emit("close_story");
    },
    changeViewingStory(story) {
      this.viewing = story;
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