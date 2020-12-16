<template>
  <div>
    <full-screen-story v-if="hasOpenedStory" :stories="stories" :viewingStory="openedStory">
      <template v-if="$slots.storyViewLeftNavButton" v-slot:storyViewLeftNavButtonSlot>
        <slot name="storyViewLeftNavButton"></slot>
      </template>
      <template v-else v-slot:storyViewLeftNavButtonSlot>
        <custom-icon name="chevron-left" base-class="custom-icon"></custom-icon>
      </template>
      <template v-if="$slots.storyViewRightNavButton" v-slot:storyViewRightNavButtonSlot>
        <slot name="storyViewRightNavButton"></slot>
      </template>
      <template v-else v-slot:storyViewRightNavButtonSlot>
        <custom-icon name="chevron-right" base-class="custom-icon"></custom-icon>
      </template>
      <template v-if="$slots.customCloseButton" v-slot:closeButtonSlot>
        <slot name="customCloseButton"></slot>
      </template>
      <template v-else v-slot:closeButtonSlot>
        <custom-icon name="x" base-class="custom-icon"></custom-icon>
      </template>
    </full-screen-story>
    <story-list v-else :stories="stories"></story-list>
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
    StoryList
  },
  data() {
    return {
      stories: storiesJson.default,
      hasOpenedStory: false,
      openedStory: {},
      baseClass: "v-icon"
    };
  },
  mounted() {
    this.$eventHub.$on("open_story", openedStory => {
      console.log("on open story");
      this.hasOpenedStory = true;
      this.openedStory = openedStory;
    });
    this.$eventHub.$on("close_story", () => {
      this.hasOpenedStory = false;
    });
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.custom-icon {
  width: 24px;
}
</style>
