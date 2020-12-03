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
      <button class="swiper-button-prev"></button>
      <button class="swiper-button-next"></button>
    </div>
  </div>
</template>
<script>
import { Swiper, SwiperSlide, directive } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
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
    story: Story,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  data() {
    return {
      itemNumber: 8,
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
    },
    swiper() {
      return this.$refs.serpPostsModuleSwiper.$swiper;
    }
  },
  mounted() {
    document
      .querySelector(".swiper-button-next")
      .addEventListener("click", () => {
        this.itemNumber += 1;
      });
  }
};
</script>
<style scoped>
.swiper {
  height: 300px;
  width: 100%;
}
.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
}
</style>