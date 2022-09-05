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
      <swiper-slide v-for="story in slicedStories" :key="story.id">
        <story :story="story" />
      </swiper-slide>
    </swiper>
    <div>
      <button class="swiper-button-prev" @click="goBack" />
      <button class="swiper-button-next" @click="goNext" />
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
    SwiperSlide,
  },
  props: {
    stories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      itemNumber: 8,
      initialItemNumber: 0,
      swiperOption: {
        slidesPerView: 7,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      },
    };
  },
  computed: {
    slicedStories() {
      return this.stories.slice(0, this.itemNumber);
    },
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
    },
  },
};
</script>
<style scoped>
.story-list {
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
}
.swiper {
  height: 100%;
  width: 100%;
}
.swiper-wrapper > div {
  display: inherit;
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
  position: absolute;
  top: 55%;
  border: 0;
  color: #fff;
  background-color: #000;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  outline-style: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
.swiper-button-next::after,
.swiper-button-prev::after {
  width: 1rem;
  height: 1rem;
  font-size: 1rem;
  font-weight: 600;
  top: 0;
}
</style>
