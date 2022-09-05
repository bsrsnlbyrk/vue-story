<template>
  <div class="full-screen-wrapper">
    <div :class="customLeftColClass">
      <story-navbar-list
        :stories="stories"
        :active-story="reactiveViewing"
        @changeViewingStory="changeViewingStory"
      />
    </div>
    <div :class="customRightColClass">
      <close-button :class="customCloseButtonClass" @clicked="closeStory">
        <template v-slot:closeButton>
          <slot name="closeButtonSlot" />
        </template>
      </close-button>
      <progress-bar />
      <nav-buttons>
        <template v-slot:leftNavButton>
          <slot name="storyViewLeftNavButtonSlot" />
        </template>
        <template v-slot:rightNavButton>
          <slot name="storyViewRightNavButtonSlot" />
        </template>
      </nav-buttons>
      <story-view
        :viewing-story="reactiveViewing"
        :duration="viewingDuration"
        @sliderReachBeginning="prevStory"
        @sliderReachEnd="nextStory"
      />
    </div>
  </div>
</template>
<script>
import StoryNavbarList from "../story-navbar/story-navbar-list/story-navbar-list";
import StoryView from "../story-view/story-view";
import ProgressBar from "../progress-bar/progress-bar";
import NavButtons from "../button/nav-buttons/nav-buttons";
import CloseButton from "../button/close-button";

export default {
  name: "FullScreenStory",
  components: {
    StoryNavbarList,
    StoryView,
    ProgressBar,
    NavButtons,
    CloseButton,
  },
  props: {
    stories: {
      type: Array,
      required: true,
    },
    viewingStory: {
      type: Object,
      required: true,
    },
    viewingDuration: {
      type: Number,
      required: true,
    },
    rightColClass: {
      type: String,
      required: false,
      default: "right-col",
    },
    leftColClass: {
      type: String,
      required: false,
      default: "left-col",
    },
    closeButtonClass: {
      type: String,
      required: false,
      default: "close-button",
    },
  },
  data() {
    return {
      viewing: null,
    };
  },
  computed: {
    customRightColClass() {
      return this.rightColClass;
    },
    customLeftColClass() {
      return this.leftColClass;
    },
    customCloseButtonClass() {
      return this.closeButtonClass;
    },
    reactiveViewing() {
      return this.viewing;
    },
  },
  created() {
    this.viewing = this.viewingStory;
  },
  methods: {
    closeStory() {
      this.$eventHub.$emit("close_story");
    },
    changeViewingStory(story) {
      this.viewing = story;
    },
    prevStory() {
      const nextIndex =
        this.stories.map((story) => story.id).indexOf(this.viewing.id) - 1;
      this.viewing = this.stories[nextIndex];
    },
    nextStory() {
      const nextIndex =
        this.stories.map((story) => story.id).indexOf(this.viewing.id) + 1;
      this.viewing = this.stories[nextIndex];
    },
  },
};
</script>
<style scoped>
.full-screen-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 100vh;
  background-color: #333;
  overflow: hidden;
}
.close-button {
  float: right;
  cursor: pointer;
}
.left-col {
  width: 40%;
  padding: 1rem;
}
.right-col {
  width: 60%;
  padding: 1rem;
}
</style>
