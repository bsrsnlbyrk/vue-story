<template>
  <div class="story-view-wrapper">
    <swiper
      class="swiper"
      :key="viewingStory.id"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <swiper-slide v-for="storyItem in viewingStory.stories" :key="storyItem.id">
        <image-renderer v-if="storyItem.type === 'photo'" :item="storyItem"></image-renderer>
        <video-renderer v-else-if="storyItem.type === 'video'" :item="storyItem"></video-renderer>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";
import ImageRenderer from "../renderers/image-renderer/image-renderer";
import VideoRenderer from "../renderers/video-renderer/video-renderer";

export default {
  name: "story-view",
  props: {
    viewingStory: {
      type: Object,
      required: true
    }
  },
  components: {
    ImageRenderer,
    VideoRenderer,
    Swiper,
    SwiperSlide
  },
  data() {
    return {
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          reachEnd: () => {
            console.log('on reach end');
            this.$emit('sliderReachEnd')
          },
          reachBeginning: () => this.$emit('sliderReachBeginning')
        }
      }
    };
  }
};
</script>
<style>
.story-view-wrapper {
    width: 50%;
    height: 100%;
    /*display: flex;*/
}
.swiper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
}
.swiper-wrapper {
    height: 90%;
}
.swiper-slide {
    width: 100%;
    height: 100%;
}
</style>