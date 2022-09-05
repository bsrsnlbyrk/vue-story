<template>
  <div class="app">
    <full-screen-story
      v-if="hasOpenedStory"
      :stories="stories"
      :viewing-story="openedStory"
      :viewing-duration="viewingDuration"
    >
      <template
        v-if="$slots.storyViewLeftNavButton"
        v-slot:storyViewLeftNavButtonSlot
      >
        <slot name="storyViewLeftNavButton" />
      </template>
      <template v-else v-slot:storyViewLeftNavButtonSlot>
        <custom-icon name="chevron-left" base-class="custom-icon" />
      </template>
      <template
        v-if="$slots.storyViewRightNavButton"
        v-slot:storyViewRightNavButtonSlot
      >
        <slot name="storyViewRightNavButton" />
      </template>
      <template v-else v-slot:storyViewRightNavButtonSlot>
        <custom-icon name="chevron-right" base-class="custom-icon" />
      </template>
      <template v-if="$slots.customCloseButton" v-slot:closeButtonSlot>
        <slot name="customCloseButton" />
      </template>
      <template v-else v-slot:closeButtonSlot>
        <custom-icon name="x" base-class="custom-icon" />
      </template>
    </full-screen-story>
    <story-list v-else :stories="stories" />
  </div>
</template>

<script>
import CustomIcon from "vue-icon/lib/vue-feather.esm";
import StoryList from "./components/story-list/story-list";
import FullScreenStory from "./components/full-screen-story/full-screen-story";
import * as storiesJson from "./stories.json";

export default {
  name: "App",
  components: {
    CustomIcon,
    FullScreenStory,
    StoryList,
  },
  props: {
    viewingDuration: {
      type: Number,
      required: false,
      default: 3000,
    },
  },
  data() {
    return {
      stories: storiesJson.default,
      hasOpenedStory: false,
      openedStory: {},
      baseClass: "v-icon",
    };
  },
  mounted() {
    this.$eventHub.$on("open_story", (openedStory) => {
      this.hasOpenedStory = true;
      this.openedStory = openedStory;
    });
    this.$eventHub.$on("close_story", () => {
      this.hasOpenedStory = false;
    });
  },
};
</script>

<style>
.app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 800px;
  margin: auto;
  margin-top: 60px;
}
.custom-icon {
  width: 24px;
}
@media screen and (max-width: 720px) {
  .app {
    width: 300px;
  }
  .custom-icon {
    width: 16px;
  }
}
</style>
