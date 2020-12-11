<template>
  <div class="story-navbar-list-wrapper">
    <story-navbar-list-item
      v-for="story in stories"
      :key="story.id"
      :listItem="story"
      :activeStory="activeStory"
    >
    </story-navbar-list-item>
  </div>
</template>

<script>
import StoryNavbarListItem from '../story-navbar-list-item/story-navbar-list-item'

export default {
  name: "story-navbar-list",
  components: {
    StoryNavbarListItem
  },
  props: {
    stories: {
      type: Array,
      required: true
    },
    activeStory: {
      type: Object,
      required: false,
      default: () => {}
    }
  }
};
</script>
<style scoped>
.story-navbar-list-wrapper {
  height: 100vh;
  overflow: scroll;
}
</style>