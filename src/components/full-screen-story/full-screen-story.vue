<template>
  <div class="full-screen-wrapper">
    <div :class="customLeftColClass">
      <story-navbar-list
        :stories="stories"
        :activeStory="reactiveViewing"
        @changeViewingStory="changeViewingStory"
      ></story-navbar-list>
    </div>
    <div :class="customRightColClass">
      <close-button :class="customCloseButtonClass" @clicked="closeStory">
        <template v-slot:closeButton>
          <slot name="closeButtonSlot"></slot>
        </template>
      </close-button>
      <progress-bar></progress-bar>
      <nav-buttons>
        <template v-slot:leftNavButton>
          <slot name="storyViewLeftNavButtonSlot"></slot>
        </template>
        <template v-slot:rightNavButton>
          <slot name="storyViewRightNavButtonSlot"></slot>
        </template>
      </nav-buttons>
      <story-view
        :viewingStory="reactiveViewing"
        :duration="viewingDuration"
        @sliderReachBeginning="prevStory"
        @sliderReachEnd="nextStory"
      ></story-view>
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
  name: "full-screen-story",
  props: {
    stories: {
      type: Array,
      required: true
    },
    viewingStory: {
      type: Object,
      required: true
    },
    viewingDuration: {
      type: Number,
      required: true
    },
    rightColClass: {
      type: String,
      required: false,
      default: "right-col"
    },
    leftColClass: {
      type: String,
      required: false,
      default: "left-col"
    },
    closeButtonClass: {
      type: String,
      required: false,
      default: "close-button"
    }
  },
  components: {
    StoryNavbarList,
    StoryView,
    ProgressBar,
    NavButtons,
    CloseButton
  },
  data() {
    return {
      viewing: null
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
    }
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
      const nextIndex = this.stories.map(story => story.id).indexOf(this.viewing.id) - 1;
      this.viewing = this.stories[nextIndex];
    },
    nextStory() {
      const nextIndex = this.stories.map(story => story.id).indexOf(this.viewing.id) + 1;
      this.viewing = this.stories[nextIndex];
    }
  }
};
</script>
<style scoped>
.full-screen-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  z-index: 10000;
  background-color: #333;
}
.close-button {
  justify-self: flex-end;
  margin-right: 15px;
  margin-top: 15px;
  float: right;
}
.left-col {
  width: 40%;
}
.right-col {
  width: 60%;
}
</style>