<template>
  <div
    :class="['story-navbar-list-item', activeClass]"
    @click="setActiveStory(listItem)"
  >
    <story :story="listItem" />
    <story-info
      :title="listItem.title"
      :date="listItem.updatedDate"
    />
  </div>
</template>

<script>
import Story from "../../story/story";
import StoryInfo from "../../story-info/story-info";

export default {
  name: "StoryNavbarListItem",
  components: {
    Story,
    StoryInfo
  },
  props: {
    listItem: {
      type: Object,
      required: true
    },
    activeStory: {
      type: Object,
      required: false,
      default: () => {}
    }
  },
  data() {
    return {
      activeStoryItem: null
    };
  },
  computed: {
    activeClass() {
      return this.activeStoryItem &&
        this.activeStoryItem.id === this.listItem.id
        ? "active"
        : null;
    }
  },
  created() {
    this.activeStoryItem = this.activeStory;
  },
  methods: {
    setActiveStory(story) {
      this.activeStoryItem = story;
      this.$emit('changeStory', story);
    }
  }
};
</script>
<style scoped>
.story-navbar-list-item {
  display: flex;
  align-items: center;
  /*justify-content: space-evenly;*/
}
</style>