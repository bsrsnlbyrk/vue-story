<template>
  <div class="story-navbar-list-wrapper">
    <RecycleScroller
      v-slot="{ item }"
      class="scroller"
      :items="stories"
      :item-size="stories.length"
      key-field="id"
    >
      <div
        class="story-navbar-list-item"
        @click="changeViewingStoryEmit(item)"
      > 
        <img
          :src="`https://img.piri.net/mnresize/113/-${item.coverPhotoPath}`"
          width="100"
          height="100"
        >
        <div class="story-info">
          <span>{{ item.title }}</span><br>
          <span>{{ item.updatedDate }}</span>
        </div>
      </div>
    </RecycleScroller>
    <!-- <story-navbar-list-item
      v-for="story in stories"
      :key="story.id"
      :listItem="story"
      :activeStory="activeStory"
      @changeStory="changeViewingStoryEmit"
    >
    </story-navbar-list-item>-->
  </div>
</template>

<script>
// import StoryNavbarListItem from "../story-navbar-list-item/story-navbar-list-item";

export default {
  name: "StoryNavbarList",
  components: {
    // StoryNavbarListItem
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
  },
  methods: {
    changeViewingStoryEmit(story) {
      this.$emit("changeViewingStory", story);
    }
  }
};
</script>
<style scoped>
.story-navbar-list-wrapper {
  height: 100vh;
  overflow: scroll;
}
.story-navbar-list-item {
  display: flex;
  align-items: center;
}
img {
  border-radius: 50%;
  margin: 10px 10px 10px;
}
.story-info {
  color: #fff;
}
</style>