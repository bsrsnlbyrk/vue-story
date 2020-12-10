<template>
  <div>
    <full-screen-story v-if="hasOpenedStory" :stories="stories" :viewingStory="openedStory"></full-screen-story>
    <story-list v-else :stories="stories"></story-list>
  </div>
</template>

<script>
import StoryList from './components/story-list/story-list';
import FullScreenStory from './components/full-screen-story/full-screen-story'
import * as storiesJson from './stories.json';

export default {
  name: 'App',
  components: {
    FullScreenStory,
    StoryList
  },
  data() {
    return {
      stories: storiesJson.default,
      hasOpenedStory: false,
      openedStory: {}
    }
  },
  mounted() {
    this.$eventHub.$on('open_story', openedStory => {
      console.log('on open story');
      this.hasOpenedStory = true;
      this.openedStory = openedStory;
    });
    this.$eventHub.$on('close_story', () => {
      this.hasOpenedStory = false;
    });
  }
}
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
</style>
