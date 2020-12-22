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
      <swiper-slide v-for="(storyItem, index) in viewingStory.stories" :key="storyItem.id">
        <image-renderer v-if="storyItem.type === 'photo'" :item="storyItem"></image-renderer>
        <video-renderer v-else-if="storyItem.type === 'video'" :item="storyItem" :indexNumber="index" :parentInterval="interval" @registerVideoInterval="registerInterval"></video-renderer>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import ImageRenderer from "../renderers/image-renderer/image-renderer";
import VideoRenderer from "../renderers/video-renderer/video-renderer";

export default {
  name: "story-view",
  props: {
    viewingStory: {
      type: Object,
      required: true
    },
    duration: {
      type: Number,
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
      interval: null,
      videoItem: null,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          reachEnd: () => this.$emit('sliderReachEnd'),
          reachBeginning: () => this.$emit('sliderReachBeginning'),
          slideChange: () => {
            clearInterval(this.interval);
            this.registerInterval();
          }
        }
      }
    };
  },
  mounted() {
    /* const keys = Object.keys(this.$refs);
    keys.map(key => {
      const videoItem = this.$refs[key];

      if(videoItem) {
        // console.log(videoItem, Number(videoItem[0].$el.duration));
        videoItem[0].$el.on('loadedmetadata', function() {
          console.log(this.duration);
        });
          // this.registerInterval(this.duration) }
      } else {
        this.registerInterval();
      }
    }); */
    this.registerInterval();
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    registerInterval(time = this.duration) {
      console.log(time);
      this.interval = setInterval(this.triggerNext, time);
    },
    triggerNext() {
      document.querySelector('.swiper-button-next').click();
    }
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