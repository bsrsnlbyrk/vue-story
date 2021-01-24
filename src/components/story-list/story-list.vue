<template>
  <div class="story-list">
    <swiper
      ref="serpPostsModuleSwiper"
      class="swiper"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <swiper-slide
        v-for="story in slicedStories"
        :key="story.id"
      >
        <story :story="story" />
      </swiper-slide>
    </swiper>
    <div>
      <button
        class="swiper-button-prev"
        @click="goBack"
      />
      <button
        class="swiper-button-next"
        @click="goNext"
      />
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import Story from "../story/story";

export default {
  name: "StoryList",
  components: {
    Story,
    Swiper,
    SwiperSlide
  },
  props: {
    stories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      itemNumber: 8,
      initialItemNumber: 0,
      swiperOption: {
        slidesPerView: 7,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      }
    };
  },
  computed: {
    slicedStories() {
      return this.stories.slice(0, this.itemNumber);
    }
  },
  mounted() {
    this.initialItemNumber = this.itemNumber;
  },
  methods: {
    goNext() {
      this.itemNumber += 1;
    },
    goBack() {
      if (this.itemNumber > this.initialItemNumber) {
        this.itemNumber -= 1;
      }
    }
  }
};
</script>
<style scoped>
.story-list {
  display: flex;
}
.swiper {
  height: 300px;
  width: 800px;
}
.swiper-wrapper > div {
  display: inherit;
  overflow-x: scroll;
}
.swiper-slide {
  display: flex;
  width: fit-content !important;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
.swiper-button-prev,
.swiper-button-next {
  border: 0;
  background: none;
  color: #aaa;
  position: absolute;
  top: 150px !important;
  outline-style: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.swiper-button-prev {
  left: 250px;
}
.swiper-button-next {
  right: 250px;
}
</style>