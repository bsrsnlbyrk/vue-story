<template>
  <div class="story-view-wrapper">
    <swiper
      class="swiper"
      ref="storyItemsSwiper"
      :key="viewingStory.id"
      :options="swiperOption"
      :auto-update="true"
      :auto-destroy="true"
      :delete-instance-on-destroy="true"
      :cleanup-styles-on-destroy="false"
    >
      <swiper-slide v-for="(storyItem, index) in viewingStory.stories" :key="storyItem.id">
        <image-renderer v-if="storyItem.type === 'photo'" :item="storyItem"></image-renderer>
        <video-renderer
          v-else-if="storyItem.type === 'video'"
          :item="storyItem"
          :indexNumber="index"
          :activeIndex="activeIndex"
          @clearParentInterval="removeInternal()"
          @slideNext="slideNext()"
        ></video-renderer>
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
      activeIndex: null,
      swiperOption: {
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        },
        on: {
          reachEnd: () => this.$emit("sliderReachEnd"),
          reachBeginning: () => this.$emit("sliderReachBeginning"),
          slideChange: () => {
            clearInterval(this.interval);
            this.registerInterval();
          }
        }
      }
    };
  },
  created() {
    this.registerInterval();
  },
  mounted() {
    this.$nextTick(() => {
      this.activeIndex = this.$refs.storyItemsSwiper.$swiper.activeIndex;
    });
  },
  beforeDestroy() {
    this.removeInternal();
  },
  methods: {
    registerInterval(time = this.duration) {
      this.interval = setInterval(this.triggerNext, time);
    },
    removeInternal() {
      clearInterval(this.interval);
    },
    triggerNext() {
      // document.querySelector(".swiper-button-next").click();
      this.$refs.storyItemsSwiper.$swiper.slideNext();
    },
    slideNext() {
      if (this.$refs.storyItemsSwiper) {
        this.$refs.storyItemsSwiper.$swiper.slideNext();
        this.activeIndex += 1;
      }
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