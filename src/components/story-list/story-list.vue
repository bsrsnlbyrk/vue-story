<template>
  <div class="story-list">
    <swiper
      class="swiper"
      ref="serpPostsModuleSwiper"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <swiper-slide v-for="story in slicedStories" :key="story.id">
        <story :story="story"></story>
      </swiper-slide>
    </swiper>
    <div>
      <button class="swiper-button-prev" @click="goBack"></button>
      <button class="swiper-button-next" @click="goNext"></button>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";
import Story from "../story/story";

export default {
  name: "story-list",
  props: {
    stories: {
      type: Array,
      required: true
    }
  },
  components: {
    Story,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      itemNumber: 8,
      initialItemNumber: 0,
      swiperOption: {
        slidesPerView: 7,
        spaceBetween: 30,
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
  width: 100%;
}
.swiper-wrapper > div {
  display: inherit;
  overflow-x: scroll;
}
.swiper-slide {
  display: flex;
  width: fit-content;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
</style>